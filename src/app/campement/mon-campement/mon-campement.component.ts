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
    private joueurService: JoueurService) { }

  ngOnInit(): void {
    this.batimentJoueurService.listerMesBatiments().subscribe((value) => {
      this.listeMesBatiments = value;
    });
    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;
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
              unBatiment.coutPierreAmelioration = monBatiment.coutPierreAmelioration * unBatiment.multiplicateurCout ;
              unBatiment.coutBoisAmelioration = monBatiment.coutBoisAmelioration * unBatiment.multiplicateurCout ;
              unBatiment.coutOrAmelioration = monBatiment.coutOreAmelioration * unBatiment.multiplicateurCout ;
              unBatiment.coutNourritureAmelioration = monBatiment.coutNourritureAmelioration * unBatiment.multiplicateurCout ;
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
      if(idTypeBatiment == element.idTypeBatiment) {
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
      if(idTypeBatiment == element.idTypeBatiment) {
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
      if(idTypeBatiment == element.idTypeBatiment) {
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
      if(idTypeBatiment == element.idTypeBatiment) {
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
      if(idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.pierrePossession < element.coutPierreAmelioration*element.batiment.multiplicateurCout) {
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
      if(idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.boisPossession < element.coutBoisAmelioration*element.batiment.multiplicateurCout) {
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
      if(idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.orPossession < element.coutOreAmelioration*element.batiment.multiplicateurCout) {
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
      if(idTypeBatiment == element.batiment.idTypeBatiment) {
        if (this.joueur.nourriturePossession < element.coutNourritureAmelioration*element.batiment.multiplicateurCout) {
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

}
