import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from 'src/app/auth/auth.domains';
import { AuthService } from '../../service/auth.service';
import { Batiment } from 'src/app/models/batiment';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';

import { JoueurService } from '../../service/joueur.service';
import { JoueurInfos } from '../../models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { formatDate } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { HeaderComponent } from 'src/app/header/header.component';
import { GenerationRessourcesService } from 'src/app/service/generation-ressources.service';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import * as introJs from 'intro.js/intro.js';


// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-detail-batiment',
  templateUrl: './detail-batiment.component.html',
  styleUrls: ['./detail-batiment.component.scss']
})
export class DetailBatimentComponent implements OnInit {

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;

  joueur: JoueurInfos;

  // Initialisations
  counterSubscription: Subscription;
  secondesRestantesAmelioration: number;
  idTypeBatiment: number;
  batiment: Batiment;
  messageErreur: String;
  messageValidation: String;
  idBatimentJoueur: number;
  // Permet de savoir si le joueur possède déjà le bâtiment, et connaitre les coûts d'amélioration
  batimentJoueurPossede: MesBatiments;
  // Changement état des boutons
  modeConstructionAmelioration: String = "construction";
  etatBoutonConstruire: String;
  etatBoutonAmeliorer: String;
  flagEnCoursDeTravail: Boolean;
  niveauHdvJoueur: number = 0;

  montantGemmeAcceleration: number;
  experience: number = 0;

  batimentUniteEnCoursDeProduction: boolean = false;

  result: string;

  // Constructeur
  constructor(private authSrv: AuthService,
    private router: Router,
    private routerLinkActive: ActivatedRoute,
    private batimentService: BatimentService,
    private batimentJoueurService: BatimentJoueurService,
    private joueurService: JoueurService,
    private notification: NotificationService,
    private generationRessourcesService: GenerationRessourcesService,
    private armeeService: ArmeeService) { }

  ngOnInit(): void {
    // Détection niveau HDV
    this.verifierNiveauHdvJoueur();

    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;

        // Vérification mode tutoriel.
        this.verificationTutorielEnCours();
      }
    );
    this.informationsBatiment();
  }

  informationsBatiment() {
    // Récupération ID batiment (URL)
    this.idTypeBatiment = this.routerLinkActive.snapshot.params['idTypeBatiment'];
    // Récupération des informations du bâtiment
    this.batimentService.detailsBatiment(this.routerLinkActive.snapshot.params['idTypeBatiment']).subscribe(
      (value) => {
        this.batiment = value;
        this.experience = value.apportExperience;
      }
    );

    // Permet de savoir si le joueur possède déjà le bâtiment, et connaitre les coûts d'amélioration
    this.batimentJoueurService.rechercheBatimentJoueur(this.routerLinkActive.snapshot.params['idTypeBatiment']).subscribe(
      (value) => {
        this.batimentJoueurPossede = value;
        // Petite vérification.
        // Cas 1 : Le joueur ne possède pas le bâtiment
        // Cas 2 : Le joueur possède déjà le bâtiment
        if (value.id == null) {
          this.modeConstructionAmelioration = "construction";
          this.etatBoutonConstruire = "disabled";
          this.etatBoutonAmeliorer = "";
        } else {
          this.experience = value.batiment.apportExperience * (Math.pow(value.batiment.multiplicateurExperience, value.niveau))
          this.modeConstructionAmelioration = "amelioration";
          this.etatBoutonConstruire = "";
          this.etatBoutonAmeliorer = "disabled";
          // Y a t'il des unités provenant de cette structure qui sont en cours de construction ? Si oui: Désactive le bouton d'amélioration
          var maintenant = new Date().getTime();
          this.armeeService.listerArmeesDuJoueur().subscribe((armee) => {
            armee.forEach((ligne) => {
              if ((ligne.unitee.idBatimentProvenance == this.routerLinkActive.snapshot.params['idTypeBatiment']) && (ligne.dateFinProduction > maintenant)) {
                this.batimentUniteEnCoursDeProduction = true;
              }
            })
          })
        }

        var dateMaintenantMillisecondes = new Date().getTime();
        // Si le batiment est en cours d'amélioration
        if (dateMaintenantMillisecondes < value.dateFinConstruction) {
          // Un booleen passe à true
          this.flagEnCoursDeTravail = true;
          // Je crée un timer de fin d'amélioration (Il prend des millisecondes, et convertis en hh:mm:ss)
          var date = new Date(null);
          date.setMilliseconds(value.dateFinConstruction - dateMaintenantMillisecondes);
          this.result = date.toISOString().substr(11, 8);
          // J'initialise sur la page le nombre de secondes d'amélioration restantes pour le bâtiment
          this.secondesRestantesAmelioration = (value.dateFinConstruction - dateMaintenantMillisecondes) / 1000;
          this.montantGemmeAcceleration = Math.ceil(this.secondesRestantesAmelioration / 30);


          // ** Actualisation chaques secondes ** */
          // Timer temps amélioration restant
          if (this.secondesRestantesAmelioration > 1) {
            // Définis l'interval de l'appel à 1000 ms (1 seconde)
            const compteur = Observable.interval(1000);
            this.counterSubscription = compteur.subscribe(
              (valeur: number) => {
                // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                this.secondesRestantesAmelioration = this.secondesRestantesAmelioration - 1;
                this.montantGemmeAcceleration = Math.ceil(this.secondesRestantesAmelioration / 30);
                // Je défini une date, pour convertir les secondes en timer (Format hh:mm:ss)
                var date = new Date(null);
                date.setSeconds(this.secondesRestantesAmelioration);
                this.result = date.toISOString().substr(11, 8);
                if (this.secondesRestantesAmelioration < 1) {
                  this.ngOnDestroy();
                  setTimeout(() => {
                    // Redirection au bout de 1,5 secondes
                    this.router.navigate(['campement']);
                  }, 2000);
                }
              }
            );
          }
        }
      }
    );
  }



  verifierNiveauHdvJoueur() {
    // Récupération liste des batiments
    this.batimentService.listerBatiments().subscribe(
      () => {
        // Récupération liste des batiments du joueur
        this.batimentJoueurService.listerMesBatiments().subscribe(
          (mesBatiments) => {
            // Boucle sur les bâtiments du joueur
            mesBatiments.forEach((monBatiment) => {
              // SI LE JOUER POSSEDE UN HDV, RECUPERATION DU NIVEAU
              if (monBatiment.batiment.idTypeBatiment == 1) {
                // MAINTENANT
                var maintenant = new Date().getTime();
                // SI HDV N'EST PAS EN CONSTRUCTION
                if (monBatiment.dateFinConstruction < maintenant) {
                  this.niveauHdvJoueur = monBatiment.niveau;
                } else {
                  this.niveauHdvJoueur = monBatiment.niveau - 1;
                }
              }
            });
          }
        );
      }
    );
  }

  // Lancement construction du bâtiment
  construire() {
    this.batimentJoueurService.creerBatimentJoueur(this.idTypeBatiment).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = error.error.message;
        this.notification.showError(error.error.message, "Erreur ...");
      }, () => {

        this.notification.showInfo("", "+" + this.experience + " Experience");
        this.notification.showSuccess("", "Construction lancée.");

        this.informationsBatiment();
      }
    );
  }

  // Lancement construction du bâtiment
  ameliorer() {
    if (this.batimentUniteEnCoursDeProduction) {
      this.notification.showWarning("L'amélioration n'est pas possible pour le moment. Vous avez des unités en cours de production.", "Patience...");
    } else {
      this.batimentJoueurService.ameliorerBatimentJoueur(this.batimentJoueurPossede.id).subscribe(
        () => {
        }, (error) => {
          this.messageErreur = error.error.message;
          this.notification.showError(error.error.message, "Erreur ...");
        }, () => {
          this.notification.showInfo("", "+" + this.experience + " Experience");
          this.notification.showSuccess("", "Amélioration lancée !");
          this.informationsBatiment();
          /*           setTimeout(() => {
                      // Redirection au bout de 1,5 secondes
                      this.router.navigate(['campement']);
                    }, 1500); */
        }
      );
    }

  }

  // Batiments Joueur Amélioration Colorisation ressources
  getColorRessourceManquantePierreBatimentJoueur() {
    if (this.joueur.pierrePossession < this.batimentJoueurPossede.coutPierreAmelioration * this.batiment.multiplicateurCout) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteBoisBatimentJoueur() {
    if (this.joueur.boisPossession < this.batimentJoueurPossede.coutBoisAmelioration * this.batiment.multiplicateurCout) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteOrBatimentJoueur() {
    if (this.joueur.orPossession < this.batimentJoueurPossede.coutOreAmelioration * this.batiment.multiplicateurCout) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteNourritureBatimentJoueur() {
    if (this.joueur.nourriturePossession < this.batimentJoueurPossede.coutNourritureAmelioration * this.batiment.multiplicateurCout) {
      return 'red';
    } else {
      return 'green';
    }
  }
  // Batiments Construction Colorisation ressources
  getColorRessourceManquantePierreBatiment() {
    if (this.joueur.pierrePossession < this.batiment.coutPierreConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteBoisBatiment() {
    if (this.joueur.boisPossession < this.batiment.coutBoisConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteOrBatiment() {
    if (this.joueur.orPossession < this.batiment.coutOrConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteNourritureBatiment() {
    if (this.joueur.nourriturePossession < this.batiment.coutNourritureConstruction) {
      return 'red';
    } else {
      return 'green';
    }
  }

  getTempsRestant() {
    // Temps du niveau suivantle
    let tempsMax;
    let pourcentageRestant;
    if (this.batimentJoueurPossede.niveau == 1) {
      tempsMax = this.batiment.tempsDeConstruction;
    }
    else {
      tempsMax = this.batimentJoueurPossede.tempsAmelioration;
    }
    pourcentageRestant = 100 - (this.secondesRestantesAmelioration * 100) / tempsMax;
    return pourcentageRestant + '%';
  }

  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

  // ACCELERATION AMELIORATION AVEC GEMMES
  acceleration() {
    this.batimentJoueurService.accelerationConstructionBatiment(this.batimentJoueurPossede.id).subscribe(
      () => {
        this.notification.showSuccess("Amélioration terminée", "Succès !");
        this.router.navigate(['/campement']);
      }, (error) => {
        this.notification.showError(error.error.message, "Erreur ...");
      }
    );
  }

  verificationTutorielEnCours() {
    setTimeout(() => {
      this.routerLinkActive.queryParams.subscribe(params => {
        let modeTutoriel = params['tutoriel'];
        if (modeTutoriel == "enCours") {
          this.tutoriel();
        } else if (modeTutoriel == "enCoursP2") {
          this.tutoriel3();
        }
      });
    }, 600);
  }

  // Tutoriel partie 1 (Campement -> Détail bâtiment HDV)
  tutoriel() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        {
          // Présentation card
          element: '#section_batiment',
          intro: "Voilà le bâtiment le plus important de votre campement : <strong>L'Hôtel de ville</strong>.<br><br> Il vous permettra de débloquer diverse constructions et vous assurera un apport régulier de ressources.",
          showStepNumber: true
        },
        {
          // Coûts de construction
          element: '#section_cout_construction',
          intro: "Pour pouvoir lancer la construction d'un bâtiment, il vous sera necessaire d'utiliser quelques <b>ressources</b>. <br><br> Un temps de construction est également à prévoir.<br><br> Plus le <b>niveau</b> du bâtiment sera élevé, plus le <b>temps de construction</b> sera élevé lui aussi !",
          showStepNumber: true
        },
        {
          // Bouton construire
          element: '#section_construire',
          intro: "Lançons la constructions ensemble !",
          showStepNumber: true
        }
      ]
      // Tutoriel terminé. Détail bâtiment HDV [Construire] -> Détail bâtiment HDV [En cours]
    }).oncomplete(() => {
      // Lancer la construction
      this.construire();

      // Lancer le deuxieme tutoriel de la page
      this.tutoriel2();
    });

    // Lancement
    intro.start();
  }

  // Tutoriel partie 2 (Détail bâtiment HDV [Construire] -> Détail bâtiment HDV [En cours])
  tutoriel2() {
    setTimeout(() => {
      var intro = introJs();
      intro.setOptions({
        disableInteraction: true,
        showProgress: true,
        nextLabel: 'Suivant',
        prevLabel: 'Precedent',
        doneLabel: 'Continuer',
        tooltipClass: 'customTooltip',
        steps: [
          {
            // Temps d'attente
            element: '#section_temps_restant',
            intro: "Super ! Vous n'avez plus qu'à attendre <b>5 minutes</b>.",
            showStepNumber: true
          },
          {
            // Bouton acceleration avec gemmes
            element: '#section_accelerer_construction',
            intro: "... Ou bien vous pouvez utiliser vos <b>gemmes</b> pour achever instantanément la construction. <br><br>Je vous en ai offert quelques unes, essayez !",
            showStepNumber: true
          }
        ]
        // Tutoriel terminé. Détail bâtiment HDV [En cours] -> Campement
      }).oncomplete(() => {
        // Utilisation gemmes
        this.batimentJoueurService.accelerationConstructionBatiment(this.batimentJoueurPossede.id).subscribe(
          () => {
            this.notification.showSuccess("Amélioration terminée", "Succès !");
            this.router.navigate(['campement'], { queryParams: { tutoriel: 'enCoursP2' } });
          }, (error) => {
            this.notification.showError(error.error.message, "Erreur ...");
          }
        );
      });
      intro.start();
    }, 600);
  }

  // Tutoriel partie 3 (Campement -> Détail bâtiment FERME [Construire])
  tutoriel3() {
    setTimeout(() => {
      var intro = introJs();
      intro.setOptions({
        disableInteraction: true,
        showProgress: true,
        nextLabel: 'Suivant',
        prevLabel: 'Precedent',
        doneLabel: 'Feu !',
        tooltipClass: 'customTooltip',
        // Annonce construction
        steps: [
          {
            element: '#section_construire',
            intro: "Construction dans <br><br><b>3 ... 2 ... 1 ... <b>",
            showStepNumber: true
          }
        ]
        // Construction lancée Détail bâtiment FERME [Construire] --> Détail bâtiment FERME [En cours]
      }).oncomplete(() => {
        // Utilisation gemmes
        this.construire();
        this.tutoriel4();
      });
      intro.start();
    }, 600);
  }

  // Tutoriel partie 4 (Détail bâtiment FERME [Construire] -> Détail bâtiment FERME [En cours])
  tutoriel4() {
    setTimeout(() => {
      var intro = introJs();
      intro.setOptions({
        disableInteraction: true,
        showProgress: true,
        nextLabel: 'Suivant',
        prevLabel: 'Precedent',
        doneLabel: 'Continuer',
        tooltipClass: 'customTooltip',
        steps: [
          {
            intro: "Super !",
            showStepNumber: true
          },
          // Bouton acceleration avec gemmes
          {
            element: '#section_accelerer_construction',
            intro: "Lançons l'accélération maintenant. C'est cadeau !",
            showStepNumber: true
          }
        ]
        // Accélération lancée. Détail bâtiment FERME [En cours] --> Campement
      }).oncomplete(() => {
        // Utilisation gemmes
        this.batimentJoueurService.accelerationConstructionBatiment(this.batimentJoueurPossede.id).subscribe(
          () => {
            this.notification.showSuccess("Amélioration terminée", "Succès !");
            this.router.navigate(['campement'], { queryParams: { tutoriel: 'enCoursP4' } });
          }, (error) => {
            this.notification.showError(error.error.message, "Erreur ...");
          }
        );
      });
      intro.start();
    }, 600);
  }
}
