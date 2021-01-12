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
  niveauHdvJoueur: number;
  lesBatiments = [];
  i: number;
  flag:boolean;
  dateDeFin:String;
  result:string;
  secondesRestantesAmelioration:number;

  // Constructeur
  constructor(private authSrv: AuthService, private batimentService: BatimentService, private batimentJoueurService: BatimentJoueurService) { }

  ngOnInit(): void {
    // Récupération liste des tous les batiments existants
    this.batimentService.listerBatiments().subscribe(
      (value) => {
        this.lesBatiments = value;
       // this.listeBatiments = value;
      }
    );


    // On vérifie si l'utilisateur est bien connecté
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => {
        // Récupération liste des batiments du joueur
        this.batimentJoueurService.listerMesBatiments(etatConnexion.id).subscribe(
          (mesBatiments) => {
            // Boucle sur les bâtiments du joueur
            mesBatiments.forEach((monBatiment) => {

              // Boucle sur tous les bâtiments existents
              this.lesBatiments.forEach((unBatiment) => {
                // Si l'id du batiment en cours d'analyse = a l'id du bâtiment du joueur , alors je considère qu'il le possède
                if(monBatiment.batiment.idTypeBatiment === unBatiment.idTypeBatiment) {
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
            this.listeMesBatiments = mesBatiments;
            this.listeMesBatiments.forEach(data => {
              if(data.batiment.idTypeBatiment==1) {
                this.niveauHdvJoueur = data.niveau;
              }
            });
          }
        );
      }
    );
  }

  ngOnDestroy():void {
    if(this.counterSubscription){
      this.counterSubscription.unsubscribe();
     } 
  }

}
