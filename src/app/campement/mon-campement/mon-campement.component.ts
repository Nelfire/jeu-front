import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/auth/auth.domains';
import { Batiment } from 'src/app/models/batiment';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { AuthService } from 'src/app/service/auth.service';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';
import { CampementService } from 'src/app/service/campement.service';
import { formatDate } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { BoundElementProperty } from '@angular/compiler';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { JoueurService } from 'src/app/service/joueur.service';
import * as introJs from 'intro.js/intro.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mon-campement',
  templateUrl: './mon-campement.component.html',
  styleUrls: ['./mon-campement.component.scss']
})
export class MonCampementComponent implements OnInit {

  // Initialisations
  counterSubscription: Subscription;
  subscriptions: Subscription[] = []
  listeBatiments: Batiment[];
  listeMesBatiments: MesBatiments[];
  utilisateurConnecte: Joueur;
  niveauHdvJoueur: number = 0;
  lesBatiments = [];
  i: number;
  flag: boolean;
  dateDeFin: String;
  result: string;
  secondesRestantesAmelioration: number;
  joueur: JoueurInfos;

  // Constructeur
  constructor(private batimentService: BatimentService,
    private batimentJoueurService: BatimentJoueurService,
    private joueurService: JoueurService,
    private router: Router,
    private routerLinkActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.batimentJoueurService.listerMesBatiments().subscribe((value) => {
      this.listeMesBatiments = value;
    });
    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;

        // Vérification mode tutoriel.
        this.verificationTutorielEnCours();
      }
    );

    // Récupération liste des tous les batiments existants
    this.batimentsTous();
  }


  // LISTER TOUS LES BATIMENTS , TOUT CONFONDUS
  batimentsTous() {
    // Récupération liste des batiments (Type:Tous)
    this.batimentService.listerBatiments().subscribe(
      (value) => {
        this.lesBatiments = value;
        this.listeDesBatiments();
      }
    );
  }

  /**
   * LISTER QUE LES BATIMENTS DE TYPE DIVERS = 0
   */
  batimentsDivers() {
    // Récupération liste des batiments (Type:Divers)
    this.batimentService.listerBatimentsDivers().subscribe(
      (value) => {
        this.lesBatiments = value;
        this.listeDesBatiments();
      }
    );
  }

  /**
   * LISTER QUE LES BATIMENTS DE TYPE RECOLTE = 1
   */
  batimentsRecolte() {
    // Récupération liste des batiments (Type:Recolte)
    this.batimentService.listerBatimentsRecolte().subscribe(
      (value) => {
        this.lesBatiments = value;
        this.listeDesBatiments();
      }
    );
  }
  /**
   * LISTER QUE LES BATIMENTS DE TYPE STOCKAGE = 2
   */
  batimentsStockage() {
    // Récupération liste des batiments (Type:Stockage)
    this.batimentService.listerBatimentsStockage().subscribe(
      (value) => {
        this.lesBatiments = value;
        this.listeDesBatiments();
      }
    );
  }

  /**
  * LISTER QUE LES BATIMENTS DE TYPE MILLITAIRE = 3
  */
  batimentsMillitaire() {
    // Récupération liste des batiments (Type:Millitaire)
    this.batimentService.listerBatimentsMillitaire().subscribe(
      (value) => {
        this.lesBatiments = value;
        this.listeDesBatiments();
      }
    );
  }

  listeDesBatiments() {
    // Récupération liste des batiments
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

          // Boucle sur tous les bâtiments existants
          this.lesBatiments.forEach((unBatiment) => {
            // Si l'id du batiment en cours d'analyse = a l'id du bâtiment du joueur , alors je considère qu'il le possède
            if (monBatiment.batiment.idTypeBatiment === unBatiment.idTypeBatiment) {
              unBatiment.joueurLePossede = true;
              unBatiment.coutPierreAmelioration = monBatiment.coutPierreAmelioration * unBatiment.multiplicateurCout;
              unBatiment.coutBoisAmelioration = monBatiment.coutBoisAmelioration * unBatiment.multiplicateurCout;
              unBatiment.coutOrAmelioration = monBatiment.coutOreAmelioration * unBatiment.multiplicateurCout;
              unBatiment.coutNourritureAmelioration = monBatiment.coutNourritureAmelioration * unBatiment.multiplicateurCout;
              unBatiment.tempsAmelioration = monBatiment.tempsAmelioration * unBatiment.multiplicateurTemps;
              unBatiment.niveauBatimentDuJoueur = monBatiment.niveau;
              unBatiment.dateFinConstruction = monBatiment.dateFinConstruction;
              this.flag = true;
              // on formate la date du jour au format 'yyyy-MM-dd hh:mm:ss'
              var dateMaintenantMillisecondes = new Date().getTime();
              // on formate la date de de fin de construction au format 'yyyy-MM-dd hh:mm:ss'
              // Si le batiment est en cours d'amélioration
              if (dateMaintenantMillisecondes < unBatiment.dateFinConstruction) {
                unBatiment.secondesRestantesAmelioration = (unBatiment.dateFinConstruction - dateMaintenantMillisecondes) / 1000;
                unBatiment.flagEnCoursDeTravail = true;
                // Définis l'interval de l'appel à 1000 ms (1 seconde)
                const compteur = Observable.interval(1000);
                this.counterSubscription = compteur.subscribe(
                  (valeur: number) => {
                    // EN CAS DE FIN DE TIMER, DESTRUCTION DES SUBSCRIPTIONS + "RECHARGE" DU COMPONENT
                    if (unBatiment.secondesRestantesAmelioration < 1) {
                      this.ngOnDestroy();
                      this.ngOnInit();
                    }
                    // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                    unBatiment.secondesRestantesAmelioration--;
                    unBatiment.dateFinConstruction = unBatiment.secondesRestantesAmelioration;
                    var date = new Date(null);
                    date.setSeconds(unBatiment.dateFinConstruction);
                    unBatiment.date = date.toISOString().substr(11, 8);
                  }
                );
                // AJOUT DE LA SUBSCRIPTION AU TABLEAU
                this.subscriptions.push(this.counterSubscription);
              }
            }
          });
        });
      }
    );
  }

  // ------- CONSTRUCTION -----
  // Batiments Amélioration Colorisation ressources
  getColorRessourceManquantePierreConstructionBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.lesBatiments.forEach(element => {
      if (idTypeBatiment == element.idTypeBatiment) {
        if (this.joueur.pierrePossession < element.coutPierreConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteBoisConstructionBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.lesBatiments.forEach(element => {
      if (idTypeBatiment == element.idTypeBatiment) {
        if (this.joueur.boisPossession < element.coutBoisConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteOrConstructionBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.lesBatiments.forEach(element => {
      if (idTypeBatiment == element.idTypeBatiment) {
        if (this.joueur.orPossession < element.coutOrConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteNourritureConstructionBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.lesBatiments.forEach(element => {
      if (idTypeBatiment == element.idTypeBatiment) {
        if (this.joueur.nourriturePossession < element.coutNourritureConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  // -------AMELIORATION -----
  // Batiments Amélioration Colorisation ressources
  getColorRessourceManquantePierreAmeliorationBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.listeMesBatiments.forEach(element => {
      if (idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.pierrePossession < element.coutPierreAmelioration * element.batiment.multiplicateurCout) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteBoisAmeliorationBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.listeMesBatiments.forEach(element => {
      if (idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.boisPossession < element.coutBoisAmelioration * element.batiment.multiplicateurCout) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteOrAmeliorationBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.listeMesBatiments.forEach(element => {
      if (idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.orPossession < element.coutOreAmelioration * element.batiment.multiplicateurCout) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteNourritureAmeliorationBatiment(idTypeBatiment: number) {
    var couleur = '';
    this.listeMesBatiments.forEach(element => {
      if (idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.nourriturePossession < element.coutNourritureAmelioration * element.batiment.multiplicateurCout) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }

  // DESTRUCTIONS
  ngOnDestroy() {
    if (this.counterSubscription) {
      this.subscriptions.forEach(
        (subscription) => subscription.unsubscribe()
      )
    }
  }


  verificationTutorielEnCours() {
    setTimeout(() => {
      this.routerLinkActive.queryParams.subscribe(params => {
        let modeTutoriel = params['tutoriel'];
        if (modeTutoriel == "enCours") {
          this.tutoriel();
        } else if (modeTutoriel == "enCoursP2") {
          this.tutoriel2();
        } else if (modeTutoriel == "enCoursP4") {
          this.tutoriel4();
        }
      });
    }, 600);
  }

  // Tutoriel partie 1 (Accueil -> Campement)
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
        { // Présentation vue
          intro: "Voilà votre campement.<br><br> Voyez tous les bâtiments que vous allez pouvoir construire !",
          showStepNumber: true
        },
        { // Ciblage HDV. 
          element: '#btm1',
          intro: "Il est temps de construire votre <b>premier bâtiment</b>. Allons-y !",
          showStepNumber: true
        }
      ]
      // Tutoriel terminé. Campement --> Détail bâtiment Hdv
    }).oncomplete(() => {
      this.router.navigate(['batiment/detail-batiment/1'], { queryParams: { tutoriel: 'enCours' } });
    });

    // Lancement
    intro.start();
  }

  // Tutoriel partie 2
  tutoriel2() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Focus hdv
          element: '#etape16',
          intro: "Regardez ! <br><br>La construction de votre <b>Hôtel de ville est terminée</b> et vous avez débloqué plein de <b>nouvelles constructions</b>.",
          showStepNumber: true
        },
        {
          // Annonce
          intro: "Construisons ensemble les principaux bâtiments de récolte. J'ai un petit quelque chose à vous montrer par la suite."
        },
        {
          // Filtra par type "Recolte"
          element: '#typeRecolte',
          intro: "Filtrez les bâtiments par type, pour les retrouver plus facilement."
        }
      ]
      // Tutoriel terminé. Lancement tutoriel 3
    }).oncomplete(() => {
      this.batimentsRecolte();
      this.tutoriel3();
    });

    // Lancement
    intro.start();
  }

  // Tutoriel partie 3 présentation bâtiments de récolte
  tutoriel3() {
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
          { // Focus carrière
            element: '#btm3',
            intro: "Voici la carrière, qui permet de récolter de la pierre.",
            showStepNumber: true
          },
          { // Focus camp de bûcheron
            element: '#btm4',
            intro: "Là, le camp de bûcheron, pour ramasser du bois."
          },
          { // Focus camp de mineur
            element: '#btm5',
            intro: "Le camp de mineur, pour extraire les minerais rare de la terre."
          },
          { // Focus ferme
            element: '#btm6',
            intro: "Et voici la ferme qui permet de produire de la nourriture.<br><br> Profitons-en pour la construire !"
          }
        ]
        // Tutoriel terminé. Campement --> Détail ferme
      }).oncomplete(() => {
        this.router.navigate(['batiment/detail-batiment/6'], { queryParams: { tutoriel: 'enCoursP2' } });
      });

      // Lancement
      intro.start();
    }, 600);
  }

  // Amélioration ferme terminée, envoi vers le centre de clic
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
          { // Barre ressource nourriture
            element: '#ressource_nourriture',
            intro: "Génial ! Vous avez une ferme fonctionnelle qui produit maintenant de la nourriture.",
            showStepNumber: true
          },
          { // Barre ressource nourriture (limite)
            element: '#ressource_nourriture_limite',
            intro: "Au delà d'une certaine limite, vos reserves seront pleines. Pensez à construire des structures de stockage.",
            showStepNumber: true
          },
          { // Centre de récolte
            element: '#menu_centre_recolte',
            intro: "Une dernière chose à vous montrer ... allons jeter un oeil au centre de récolte.",
            showStepNumber: true
          }
        ]
        // Tutoriel terminé. Campement --> Centre de récolte
      }).oncomplete(() => {
        this.router.navigate(['centreRecolte'], { queryParams: { tutoriel: 'enCours' } });
      });

      // Lancement
      intro.start();
    }, 600);
  }

}
