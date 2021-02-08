import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Armee } from 'src/app/models/armee';
import { Batiment } from 'src/app/models/batiment';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { JoueurService } from 'src/app/service/joueur.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-detail-unitee',
  templateUrl: './detail-unitee.component.html',
  styleUrls: ['./detail-unitee.component.scss']
})
export class DetailUniteeComponent implements OnInit, OnDestroy {

  // Initialisations
  joueur: JoueurInfos;
  id: number;
  unitee: Unitee;
  messageErreur: string;
  messageValidation: string;
  formCreationUnitee: FormGroup;
  coutPierreFormation: number;
  coutBoisFormation: number;
  coutOrFormation: number;
  coutNourritureFormation: number;
  quantite: number;
  lesUnitees = [];
  batimentJoueur: MesBatiments;
  joueurPossedeBatiment: boolean;
  niveauBatimentAssezEleveFormation: boolean;
  batimentEnCoursDeTravail: boolean;

  counterSubscription: Subscription;
  result: string;

  // Unitées en cours de production 
  secondesRestantesAmelioration: number;
  uniteesRestantes: number;
  uniteesRestantesArrondis:number;
  quantiteeUniteesPossession: number;
  dateLancementProduction: number;
  dateFinProduction: number;


  // Constructeur
  constructor(private routerLinkActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private uniteeService: UniteeService,
    private armeeService: ArmeeService,
    private joueurService: JoueurService,
    private batimentJoueurService: BatimentJoueurService,
    private notification: NotificationService) { }

  ngOnInit(): void {

    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;
      }
    );

    this.initForm();
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    this.uniteeService.detailsUnitee(this.id).subscribe(
      (value) => {
        this.unitee = value;
        this.quantite = 1;
        this.coutPierreFormation = value.coutPierreFormation;
        this.coutBoisFormation = value.coutBoisFormation;
        this.coutOrFormation = value.coutOrFormation;
        this.coutNourritureFormation = value.coutNourritureFormation;

        // Vérification que le joueur possède le bâtiment pour construire l'unitée
        this.batimentJoueurService.listerMesBatiments().subscribe(
          (batimentJoueur) => {
            batimentJoueur.forEach((unBatiment) => {
              // Si le joueur possède le bâtiment
              if (unBatiment.batiment.id === value.idBatimentProvenance) {
                this.joueurPossedeBatiment = true;
                // Si le niveau du bâtiment est suffisement élevé pour la formation de l'unitée
                if (unBatiment.niveau >= value.niveauBatimentNecessaireFormation) {
                  this.niveauBatimentAssezEleveFormation = true;
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
        this.recuperationArmeeJoueur();
      }
    );
  }

  recuperationArmeeJoueur() {
    console.log("recuperationArmeeJoueur");
    this.armeeService.listerArmeesDuJoueur().subscribe(
      (lesArmees) => {
        lesArmees.forEach(armee => {

          // Si le joueur possède le type d'unitée de la page
          if (armee.unitee.id == this.id) {
            console.log(armee.unitee.libelle)

            console.log("quantiteeUniteesPossession " + armee.quantitee)
            // Vérification formation en cours
            var dateMaintenantMillisecondes = new Date().getTime();
            console.log("dateMaintenantMillisecondes : " + dateMaintenantMillisecondes)
            console.log("armee.dateFinProduction : " + armee.dateFinProduction)
            if (armee.dateFinProduction > dateMaintenantMillisecondes) {
              // formation en cours
              this.secondesRestantesAmelioration = (armee.dateFinProduction - dateMaintenantMillisecondes) / 1000;
              this.dateLancementProduction = armee.dateDebutProduction;
              this.dateFinProduction = armee.dateFinProduction;
              // actualisation du timer
              if (this.secondesRestantesAmelioration > 1) {
                // Définis l'interval de l'appel à 1000 ms (1 seconde)
                const compteur = Observable.interval(1000);
                this.counterSubscription = compteur.subscribe(
                  () => {
                    console.log("Timer unitée")


                    // A chaques appel, réduction de 1 seconde le nombre de secondes présentes dans le compteur
                    this.secondesRestantesAmelioration = Math.ceil(this.secondesRestantesAmelioration - 1);
                    this.uniteesRestantesArrondis = Math.ceil(this.secondesRestantesAmelioration / armee.unitee.tempsFormation);
                    this.uniteesRestantes = this.secondesRestantesAmelioration / armee.unitee.tempsFormation;
                    // Je défini une date, pour convertir les secondes en timer (Format hh:mm:ss)
                    var date = new Date(null);
                    date.setSeconds(this.secondesRestantesAmelioration);
                    this.result = date.toISOString().substr(11, 8);

                    // MISE A JOUR DE LA QUANTITE D'UNITEES QUE LE JOUEUR POSSEDE
                    this.quantiteeUniteesPossession = Math.trunc(armee.quantitee - this.uniteesRestantes);

                    if (this.secondesRestantesAmelioration < 1) {
                      this.ngOnDestroy();
                      setTimeout(() => {
                        // "Refresh" au bout d'1.5sc
                        this.secondesRestantesAmelioration = undefined;
                        this.uniteesRestantesArrondis = undefined;
                        this.uniteesRestantes = undefined;
                        this.ngOnDestroy();
                        this.ngOnInit();
                      }, 1500);

                    }



                  }
                );

              }
            } else {
              // Unitées déjà formées
              this.quantiteeUniteesPossession = armee.quantitee;
            }
          }
        });
      }
    )
  }

  initForm() {
    this.formCreationUnitee = this.formBuilder.group({
      quantite: ['', Validators.required],
    });
  }

  produireUnitee() {
    const quantite = this.formCreationUnitee.get('quantite').value;
    this.armeeService.produireUnitee(this.id, quantite).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = error.error.message;
        this.notification.showError(error.error.message, "Ressources manquantes.");

      }, () => {
        // Toastr
        quantite == 1 ? this.notification.showSuccess("Production d'une unitée.", "Production lancée.") : this.notification.showSuccess("Production de " + quantite + " unitées.", "Production lancée.");

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

  // Retourne le nombre maximal d'unitées que peut produire le joueur avec les ressources qu'il possède actuellement.
  maximum() {
    this.quantite = Math.trunc(this.joueur.pierrePossession / this.unitee.coutPierreFormation);
    if (Math.trunc(this.joueur.boisPossession / this.unitee.coutBoisFormation) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.boisPossession / this.unitee.coutBoisFormation);
    }
    if (Math.trunc(this.joueur.orPossession / this.unitee.coutOrFormation) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.orPossession / this.unitee.coutOrFormation);
    }
    if (Math.trunc(this.joueur.nourriturePossession / this.unitee.coutNourritureFormation) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.nourriturePossession / this.unitee.coutNourritureFormation);
    }
    this.recalculPrix(Math.trunc(this.quantite));
  }

  recalculPrix(qt: number) {
    this.coutPierreFormation = this.unitee.coutPierreFormation * qt;
    this.coutBoisFormation = this.unitee.coutBoisFormation * qt;
    this.coutOrFormation = this.unitee.coutOrFormation * qt;
    this.coutNourritureFormation = this.unitee.coutNourritureFormation * qt;
  }



  // Batiments Joueur Amélioration Colorisation ressources
  getColorRessourceManquantePierre() {
    if (this.joueur.pierrePossession < this.coutPierreFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteBois() {
    if (this.joueur.boisPossession < this.coutBoisFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteOr() {
    if (this.joueur.orPossession < this.coutOrFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteNourriture() {
    if (this.joueur.nourriturePossession < this.coutNourritureFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }

  getTempsFormationUniteePourcent() {
    // Temps du niveau suivantle
    let pourcentageRestant;


    pourcentageRestant = 100 - ((this.secondesRestantesAmelioration%this.unitee.tempsFormation) * 100) / this.unitee.tempsFormation;

   // console.log("pourcentageRestant",pourcentageRestant);
    return pourcentageRestant + '%';
  }
  getTempsFormationTotalFileAttentePourcent() {
    // Temps du niveau suivantle
    let pourcentageRestante;
    console.log("dateLancementProduction : "+this.dateLancementProduction);
    console.log("dateFinProduction : "+this.dateFinProduction);

    let differenceSecondes = (this.dateFinProduction-this.dateLancementProduction)/1000;
    //console.log("differenceDeux"+differenceDeux)

    console.log("difference :"+differenceSecondes)
    //pourcentageRestante = 100 - (((difference) * 100) / this.dateFinProduction);
    pourcentageRestante = 100 - (this.secondesRestantesAmelioration*100)/(differenceSecondes);

    //console.log("this.dateFinProduction : ",this.dateFinProduction)
    //console.log("this.secondesRestantesAmelioration : ",this.secondesRestantesAmelioration)
    //console.log("pourcentageRestant",pourcentageRestante);
    return pourcentageRestante + '%';
  }

  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

}
