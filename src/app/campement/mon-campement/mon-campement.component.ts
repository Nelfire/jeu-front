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

@Component({
  selector: 'app-mon-campement',
  templateUrl: './mon-campement.component.html',
  styleUrls: ['./mon-campement.component.scss']
})
export class MonCampementComponent implements OnInit {

  // Initialisations
  counterSubscription: Subscription;
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

  // Constructeur
  constructor(private batimentService: BatimentService, private batimentJoueurService: BatimentJoueurService) { }

  ngOnInit(): void {
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
                    // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                    unBatiment.secondesRestantesAmelioration--;
                    unBatiment.dateFinConstruction = unBatiment.secondesRestantesAmelioration;
                    var date = new Date(null);
                    date.setSeconds(unBatiment.dateFinConstruction);
                    unBatiment.date = date.toISOString().substr(11, 8);
                  }
                );
              }
            }
          });
        });
      }
    );
  }


  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

}
