import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurInfos } from '../models/joueur-infos';
import { JoueurService } from '../service/joueur.service';
import { NotificationService } from '../service/notification.service';
import { GenerationRessourcesService } from '../service/generation-ressources.service';
import { BatimentService } from '../service/batiment.service';
import { BatimentJoueurService } from '../service/batiment-joueur.service';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.scss']
})
export class MarcheComponent implements OnInit {

  // INITIALISATIONS
  infosJoueur: JoueurInfos;
  formMarche: FormGroup;
  quantitePierre: number = 0;
  quantiteBois: number = 0;
  quantiteOr: number = 0;
  quantiteNourriture: number = 0;
  niveauMarche: number = 0;
  // Partie de droite (Echange)
  montantPierreEchange: number;
  montantBoisEchange: number;
  montantOrEchange: number;
  montantNourritureEchange: number;
  // Etat Checkbox
  etatCheckboxPierre: string = "";
  etatCheckboxBois: string = "";
  etatCheckboxOr: string = "";
  etatCheckboxNourriture: string = "";
  opacityPierre: string = "100%";
  opacityBois: string = "100%";
  opacityOr: string = "100%";
  opacityNourriture: string = "100%";

  // CONSTRUCTEUR
  constructor(private joueurService: JoueurService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private generationRessourceServices: GenerationRessourcesService,
    private batimentService: BatimentService,
    private batimentJoueurService: BatimentJoueurService) { }

  // NGONINIT
  ngOnInit(): void {
    this.verifierNiveauMarche();
    //Initialisation du formulaire vide
    this.initForm();
    this.donneesJoueur();
  }

  // INITIALISATION DU FORMULAIRE VIDE
  initForm() {
    this.formMarche = this.formBuilder.group({
      pierreJoueur: [''],
      boisJoueur: [''],
      orJoueur: [''],
      nourritureJoueur: [''],
      pierreEchange: [''],
      boisEchange: [''],
      orEchange: [''],
      nourritureEchange: ['']
    });
  }

  // BOUTON VALIDER ECHANGE
  validerEchange() {
    const pierreJoueur = this.formMarche.get('pierreJoueur').value;
    const boisJoueur = this.formMarche.get('boisJoueur').value;
    const orJoueur = this.formMarche.get('orJoueur').value;
    const nourritureJoueur = this.formMarche.get('nourritureJoueur').value;

    // Vérification saisie menue de gauche
    if (pierreJoueur == 0 && boisJoueur == 0 && orJoueur == 0 && nourritureJoueur == 0) {
      this.notification.showError("Vous n'avez renseigné aucun montant de ressource à échanger.", "Erreur...");
    } else if (pierreJoueur < 0 || boisJoueur < 0 || orJoueur < 0 || nourritureJoueur < 0) {
      this.notification.showError("Une saisie négative n'est pas possible.", "Erreur...");
    }
    else {
      // Vérification finances suffisantes
      if (pierreJoueur > this.infosJoueur.pierrePossession) {
        this.notification.showError("Vous manquez de pierre pour réaliser la transaction", "Erreur");
      } else if (boisJoueur > this.infosJoueur.boisPossession) {
        this.notification.showError("Vous manquez de bois pour réaliser la transaction", "Erreur");
      } else if (orJoueur > this.infosJoueur.orPossession) {
        this.notification.showError("Vous manquez d'or pour réaliser la transaction", "Erreur");
      } else if (nourritureJoueur > this.infosJoueur.nourriturePossession) {
        this.notification.showError("Vous manquez de nourriture pour réaliser la transaction", "Erreur");
      } else {
        // Vérification saisie checkbox menu de droite
        if (this.etatCheckboxPierre == "" && this.etatCheckboxBois == "" && this.etatCheckboxOr == "" && this.etatCheckboxNourriture == "") {
          this.notification.showError("Veuillez selectionner une ressource contre laquelle échange votre production", "Erreur");
        } else {
          // Cas selection pierre
          if (this.etatCheckboxPierre == "") {
            if (pierreJoueur > 0) {
              this.notification.showError("Il n'est pas possible d'échanger de la pierre contre de la pierre... pas très utile", "Erreur");
            }
            else if ((this.infosJoueur.pierrePossession + this.montantPierreEchange) > this.infosJoueur.pierreMaximum) {
              this.notification.showWarning("Cette transaction vous ferait dépasser votre limite de stockage de pierre", "Attention");
            } else {

              this.joueurService.echangeRessource(pierreJoueur, boisJoueur, orJoueur, nourritureJoueur, true, false, false, false).subscribe(
                () => {
                  this.notification.showSuccess("", "Echange effectué");
                  this.generationRessourceServices.onFirstComponentButtonClick();
                  this.donneesJoueur();
                }, (error) => {
                  this.notification.showError(error.error.message, "Erreur");
                }
              );
            }
          } else if (this.etatCheckboxBois == "") {
            if (boisJoueur > 0) {
              this.notification.showError("Il n'est pas possible d'échanger du bois contre du bois... pas très utile", "Erreur");
            }
            else if ((this.infosJoueur.boisPossession + this.montantBoisEchange) > this.infosJoueur.boisMaximum) {
              this.notification.showWarning("Cette transaction vous ferait dépasser votre limite de stockage de bois", "Attention");

            } else {
              this.joueurService.echangeRessource(pierreJoueur, boisJoueur, orJoueur, nourritureJoueur, false, true, false, false).subscribe(
                () => {
                  this.notification.showSuccess("", "Echange effectué");
                  this.generationRessourceServices.onFirstComponentButtonClick();
                  this.donneesJoueur();
                }, (error) => {
                  this.notification.showError(error.error.message, "Erreur");
                }
              );
            }
          } else if (this.etatCheckboxOr == "") {
            if (orJoueur > 0) {
              this.notification.showError("Il n'est pas possible d'échanger de l'or contre de l'or... pas très utile", "Erreur");
            }
            else if ((this.infosJoueur.orPossession + this.montantOrEchange) > this.infosJoueur.orMaximum) {
              this.notification.showWarning("Cette transaction vous ferait dépasser votre limite de stockage d'or", "Attention");
            } else {
              this.joueurService.echangeRessource(pierreJoueur, boisJoueur, orJoueur, nourritureJoueur, false, false, true, false).subscribe(
                () => {
                  this.notification.showSuccess("", "Echange effectué");
                  this.generationRessourceServices.onFirstComponentButtonClick();
                  this.donneesJoueur();

                }, (error) => {
                  this.notification.showError(error.error.message, "Erreur");
                }
              );
            }
          } else if (this.etatCheckboxNourriture == "") {
            if (nourritureJoueur > 0) {
              this.notification.showError("Il n'est pas possible d'échanger de la nourriture contre de la nourriture... pas très utile", "Erreur");
            }
            else if ((this.infosJoueur.nourriturePossession + this.montantNourritureEchange) > this.infosJoueur.nourritureMaximum) {
              this.notification.showWarning("Cette transaction vous ferait dépasser votre limite de stockage de nourriture", "Attention");
            } else {
              this.joueurService.echangeRessource(pierreJoueur, boisJoueur, orJoueur, nourritureJoueur, false, false, false, true).subscribe(
                () => {
                  this.notification.showSuccess("", "Echange effectué");
                  this.generationRessourceServices.onFirstComponentButtonClick();
                  this.donneesJoueur();
                }, (error) => {
                  this.notification.showError(error.error.message, "Erreur");
                }
              );
            }
          }
        }
      }
    }
  }

  donneesJoueur() {
    // Informations du joueur
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
  }

  // Verification possession bâtiment de type "Marche"
  verifierNiveauMarche() {
    // Récupération liste des batiments
    this.batimentService.listerBatiments().subscribe(
      () => {
        // Récupération liste des batiments du joueur
        this.batimentJoueurService.listerMesBatiments().subscribe(
          (mesBatiments) => {
            // Boucle sur les bâtiments du joueur
            mesBatiments.forEach((monBatiment) => {
              // SI LE JOUER POSSEDE UN MARCHE (id:17), RECUPERATION DU NIVEAU
              if (monBatiment.batiment.idTypeBatiment == 17) {
                // MAINTENANT
                var maintenant = new Date().getTime();
                // SI TABLE D'EXPEDITION N'EST PAS EN CONSTRUCTION
                if (monBatiment.dateFinConstruction < maintenant) {
                  this.niveauMarche = monBatiment.niveau;
                } else {
                  this.niveauMarche = monBatiment.niveau - 1;
                }
              }
            });
          }
        );
      }
    );
  }

  // CALCULS EN FONCTION DU TAUX
  pierre(quantitePierre: number) {
    this.montantPierreEchange = quantitePierre;
    this.montantBoisEchange = Math.round(quantitePierre * 1.5);
    this.montantOrEchange = Math.round(quantitePierre * 0.66);
    this.montantNourritureEchange = Math.round(quantitePierre * 3);
    this.quantiteBois = 0
    this.quantiteOr = 0
    this.quantiteNourriture = 0
  }

  bois(quantiteBois: number) {
    this.montantPierreEchange = Math.round(quantiteBois * 0.66);
    this.montantBoisEchange = quantiteBois;
    this.montantOrEchange = Math.round(quantiteBois * 0.4);
    this.montantNourritureEchange = Math.round(quantiteBois * 2);
    this.quantitePierre = 0
    this.quantiteOr = 0
    this.quantiteNourriture = 0
  }

  or(quantiteOr: number) {
    this.montantPierreEchange = Math.round(quantiteOr * 1.66);
    this.montantBoisEchange = Math.round(quantiteOr * 2.5);
    this.montantOrEchange = quantiteOr;
    this.montantNourritureEchange = Math.round(quantiteOr * 5);
    this.quantitePierre = 0
    this.quantiteBois = 0
    this.quantiteNourriture = 0
  }

  nourriture(quantiteNourriture: number) {
    this.montantPierreEchange = Math.round(quantiteNourriture * 0.33);
    this.montantBoisEchange = Math.round(quantiteNourriture * 0.5);
    this.montantOrEchange = Math.round(quantiteNourriture * 0.2);
    this.montantNourritureEchange = quantiteNourriture;
    this.quantitePierre = 0
    this.quantiteBois = 0
    this.quantiteOr = 0
  }

  // CHECKBOX
  checkboxPierre() {
    if (this.etatCheckboxBois == "disabled") {
      this.etatCheckboxBois = "";
      this.opacityBois = "100%";
      this.etatCheckboxOr = "";
      this.opacityOr = "100%";
      this.etatCheckboxNourriture = "";
      this.opacityNourriture = "100%";
    } else {
      this.etatCheckboxBois = "disabled";
      this.opacityBois = "50%";
      this.etatCheckboxOr = "disabled";
      this.opacityOr = "50%";
      this.etatCheckboxNourriture = "disabled";
      this.opacityNourriture = "50%";

    }

  }
  checkboxBois() {
    if (this.etatCheckboxPierre == "disabled") {
      this.etatCheckboxPierre = "";
      this.opacityPierre = "100%";
      this.etatCheckboxOr = "";
      this.opacityOr = "100%";
      this.etatCheckboxNourriture = "";
      this.opacityNourriture = "100%";
    } else {
      this.etatCheckboxPierre = "disabled";
      this.opacityPierre = "50%";
      this.etatCheckboxOr = "disabled";
      this.opacityOr = "50%";
      this.etatCheckboxNourriture = "disabled";
      this.opacityNourriture = "50%";
    }
  }
  checkboxOr() {
    if (this.etatCheckboxPierre == "disabled") {
      this.etatCheckboxBois = "";
      this.opacityBois = "100%";
      this.etatCheckboxPierre = "";
      this.opacityPierre = "100%";
      this.etatCheckboxNourriture = "";
      this.opacityNourriture = "100%";
    } else {
      this.etatCheckboxBois = "disabled";
      this.opacityBois = "50%";
      this.etatCheckboxPierre = "disabled";
      this.opacityPierre = "50%";
      this.etatCheckboxNourriture = "disabled";
      this.opacityNourriture = "50%";
    }
  }
  checkboxNourriture() {
    if (this.etatCheckboxPierre == "disabled") {
      this.etatCheckboxBois = "";
      this.opacityBois = "100%";
      this.etatCheckboxOr = "";
      this.opacityOr = "100%";
      this.etatCheckboxPierre = "";
      this.opacityPierre = "100%";
    } else {
      this.etatCheckboxBois = "disabled";
      this.opacityBois = "50%";
      this.etatCheckboxOr = "disabled";
      this.opacityOr = "50%";
      this.etatCheckboxPierre = "disabled";
      this.opacityPierre = "50%";
    }
  }
}
