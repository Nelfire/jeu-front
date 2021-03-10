import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Defense } from 'src/app/models/defense';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { DefenseJoueurService } from 'src/app/service/defense-joueur.service';
import { DefenseService } from 'src/app/service/defense.service';
import { JoueurService } from 'src/app/service/joueur.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-detail-defense',
  templateUrl: './detail-defense.component.html',
  styleUrls: ['./detail-defense.component.scss']
})
export class DetailDefenseComponent implements OnInit, OnDestroy {

  // INITIALISATIONS
  joueur: JoueurInfos;
  id: number;
  defense: Defense;
  messageErreur: string;
  messageValidation: string;
  formCreationDefense: FormGroup;
  coutPierreConstruction: number;
  coutBoisConstruction: number;
  coutOrConstruction: number;
  coutNourritureConstruction: number;
  quantite: number;
  lesDefenses = [];
  batimentJoueur: MesBatiments;
  joueurPossedeBatiment: boolean;
  niveauBatimentAssezEleveConstruction: boolean;
  batimentEnCoursDeTravail: boolean;
  apportExperience: number;
  tempsConstruction: number;
  // Id Ligne Defense joueur
  idDefenseJoueur: number;
  counterSubscription: Subscription;
  result: string;

  // Defenses en cours de production 
  secondesRestantesAmelioration: number;
  defensesRestantes: number;
  defensesRestantesArrondis: number;
  quantiteeDefensesPossession: number;
  dateLancementProduction: number;
  dateFinConstruction: number;
  montantGemmeAcceleration: number;

  // CONSTRUCTEUR
  constructor(private routerLinkActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private defenseService: DefenseService,
    private defenseJoueurService: DefenseJoueurService,
    private joueurService: JoueurService,
    private batimentJoueurService: BatimentJoueurService,
    private notification: NotificationService,
    private router: Router) { }

  //NGONINIT
  ngOnInit(): void {

    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;
      }
    );

    this.initForm();
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['idDefense'];

    this.defenseService.detailsDefense(this.id).subscribe(
      (value) => {
        this.defense = value;
        this.quantite = 1;
        this.coutPierreConstruction = value.coutPierreConstruction;
        this.coutBoisConstruction = value.coutBoisConstruction;
        this.coutOrConstruction = value.coutOrConstruction;
        this.coutNourritureConstruction = value.coutNourritureConstruction;
        this.apportExperience = value.apportExperience;
        this.tempsConstruction = value.tempsConstruction;

        // Vérification que le joueur possède le bâtiment pour construire la défense
        this.batimentJoueurService.listerMesBatiments().subscribe(
          (batimentJoueur) => {
            batimentJoueur.forEach((unBatiment) => {
              // Si le joueur possède le bâtiment
              if (unBatiment.batiment.id === value.idBatimentProvenance) {
                this.joueurPossedeBatiment = true;
                // Si le niveau du bâtiment est suffisement élevé pour la construction de la défense
                if (unBatiment.niveau >= value.niveauBatimentNecessaireConstruction) {
                  this.niveauBatimentAssezEleveConstruction = true;
                }

                // Vérification si bâtiment pas en cours de travail
                // MAINTENANT
                var maintenant = new Date().getTime();
                if (unBatiment.dateFinConstruction > maintenant) {
                  this.batimentEnCoursDeTravail = true;
                }
              }
            });
          });
        this.recuperationDefensesJoueur();
      }
    );
  }

  recuperationDefensesJoueur() {
    this.defenseJoueurService.listerMesDefenses().subscribe(
      (lesDefensesJoueurs) => {
        lesDefensesJoueurs.forEach(uneDefenseJoueur => {

          // Si le joueur possède le type de défense de la page
          if (uneDefenseJoueur.defense.idTypeDefense == this.id) {
            this.idDefenseJoueur = uneDefenseJoueur.id;

            // Vérification construction en cours
            var dateMaintenantMillisecondes = new Date().getTime();

            if (uneDefenseJoueur.dateFinConstruction > dateMaintenantMillisecondes) {
              // construction en cours
              this.secondesRestantesAmelioration = (uneDefenseJoueur.dateFinConstruction - dateMaintenantMillisecondes) / 1000;
              this.montantGemmeAcceleration = Math.ceil(this.secondesRestantesAmelioration / 60);
              this.dateLancementProduction = uneDefenseJoueur.dateDebutConstruction;
              this.dateFinConstruction = uneDefenseJoueur.dateFinConstruction;
              // actualisation du timer
              if (this.secondesRestantesAmelioration > 1) {
                // Définis l'interval de l'appel à 1000 ms (1 seconde)
                const compteur = Observable.interval(1000);
                this.counterSubscription = compteur.subscribe(
                  () => {
                    // A chaques appel, réduction de 1 seconde le nombre de secondes présentes dans le compteur
                    this.secondesRestantesAmelioration = Math.ceil(this.secondesRestantesAmelioration - 1);
                    this.montantGemmeAcceleration = Math.ceil(this.secondesRestantesAmelioration / 60);
                    this.defensesRestantesArrondis = Math.ceil(this.secondesRestantesAmelioration / uneDefenseJoueur.defense.tempsConstruction);
                    this.defensesRestantes = this.secondesRestantesAmelioration / uneDefenseJoueur.defense.tempsConstruction;
                    // Je défini une date, pour convertir les secondes en timer (Format hh:mm:ss)
                    var date = new Date(null);
                    date.setSeconds(this.secondesRestantesAmelioration);
                    this.result = date.toISOString().substr(11, 8);

                    // MISE A JOUR DE LA QUANTITE DE DEFENSES QUE LE JOUEUR POSSEDE
                    this.quantiteeDefensesPossession = Math.trunc(uneDefenseJoueur.quantite - this.defensesRestantes);

                    if (this.secondesRestantesAmelioration < 1) {
                      this.ngOnDestroy();
                      setTimeout(() => {
                        // "Refresh" au bout d'1.5sc
                        this.secondesRestantesAmelioration = undefined;
                        this.defensesRestantesArrondis = undefined;
                        this.defensesRestantes = undefined;
                        this.ngOnDestroy();
                        this.ngOnInit();
                      }, 1500);

                    }
                  }
                );

              }
            } else {
              // Défenses déjà formées
              this.quantiteeDefensesPossession = uneDefenseJoueur.quantite;
            }
          }
        });
      }
    )
  }

  // INITIALISATIONS DU FORMULAIRE VIDE
  initForm() {
    this.formCreationDefense = this.formBuilder.group({
      quantite: ['', Validators.required],
    });
  }

  // BOUTON CONSTRUIRE
  construireDefense() {
    const quantite = this.formCreationDefense.get('quantite').value;
    this.defenseJoueurService.construireDefense(this.id, quantite).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = error.error.message;
        this.notification.showError(error.error.message, "Ressources manquantes.");

      }, () => {
        // Toastr
        this.notification.showInfo("", "+" + this.defense.apportExperience * quantite + " Experience");
        quantite == 1 ? this.notification.showSuccess("Production d'une défense.", "Production lancée.") : this.notification.showSuccess("Production de " + quantite + " défenses.", "Production lancée.");
        this.messageValidation = "Production lancée";
        this.ngOnDestroy();
        this.ngOnInit();

        setTimeout(() => {
          // Retrait du message de validation au bout de 2.5 sc
          this.messageValidation = undefined;
        }, 2500);
      }
    );

  }

  // Retourne le nombre maximal d'defense que peut produire le joueur avec les ressources qu'il possède actuellement.
  maximum() {
    this.quantite = Math.trunc(this.joueur.pierrePossession / this.defense.coutPierreConstruction);
    if (Math.trunc(this.joueur.boisPossession / this.defense.coutBoisConstruction) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.boisPossession / this.defense.coutBoisConstruction);
    }
    if (Math.trunc(this.joueur.orPossession / this.defense.coutOrConstruction) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.orPossession / this.defense.coutOrConstruction);
    }
    if (Math.trunc(this.joueur.nourriturePossession / this.defense.coutNourritureConstruction) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.nourriturePossession / this.defense.coutNourritureConstruction);
    }
    this.recalculPrix(Math.trunc(this.quantite));
  }

  // RECALCUL DU PRIX DES DEFENSES
  recalculPrix(qt: number) {
    this.coutPierreConstruction = this.defense.coutPierreConstruction * qt;
    this.coutBoisConstruction = this.defense.coutBoisConstruction * qt;
    this.coutOrConstruction = this.defense.coutOrConstruction * qt;
    this.coutNourritureConstruction = this.defense.coutNourritureConstruction * qt;
    this.apportExperience = this.defense.apportExperience * qt;
    this.tempsConstruction = this.defense.tempsConstruction * qt;

  }

  // Batiments Joueur Amélioration Colorisation ressources
  getColorRessourceManquantePierre() {
    if (this.joueur.pierrePossession < this.coutPierreConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteBois() {
    if (this.joueur.boisPossession < this.coutBoisConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteOr() {
    if (this.joueur.orPossession < this.coutOrConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteNourriture() {
    if (this.joueur.nourriturePossession < this.coutNourritureConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }

  getTempsConstructionDefensePourcent() {
    // Temps du niveau suivantle
    let pourcentageRestant;
    pourcentageRestant = 100 - ((this.secondesRestantesAmelioration % this.defense.tempsConstruction) * 100) / this.defense.tempsConstruction;
    return pourcentageRestant + '%';
  }
  getTempsConstructionTotalFileAttentePourcent() {

    // Temps du niveau suivantle
    let pourcentageRestante;

    let differenceSecondes = (this.dateFinConstruction - this.dateLancementProduction) / 1000;

    //pourcentageRestante = 100 - (((difference) * 100) / this.dateFinConstruction);
    pourcentageRestante = 100 - (this.secondesRestantesAmelioration * 100) / (differenceSecondes);

    return pourcentageRestante + '%';
  }

  // ACCELERATION DE LA CONSTRUCTION AVEC GEMMES
  acceleration() {
    this.defenseJoueurService.accelerationConstructionDefense(this.idDefenseJoueur).subscribe(
      () => {
        this.notification.showSuccess("Construction terminée", "Succès !");
        this.router.navigate(['/defense']);
      }, (error) => {
        this.notification.showError(error.error.message, "Erreur ...");
      }
    )
  }

  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

}
