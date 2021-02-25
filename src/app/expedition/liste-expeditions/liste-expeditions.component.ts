import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Expedition } from 'src/app/models/expedition';
import { ExpeditionJoueur } from 'src/app/models/expedition-joueur';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';
import { ExpeditionJoueurService } from 'src/app/service/expedition-joueur.service';
import { ExpeditionService } from 'src/app/service/expedition.service';
import { JoueurService } from 'src/app/service/joueur.service';

@Component({
  selector: 'app-liste-expeditions',
  templateUrl: './liste-expeditions.component.html',
  styleUrls: ['./liste-expeditions.component.scss']
})
export class ListeExpeditionsComponent implements OnInit, OnDestroy {

  // Initialisations 
  listeExpedition = [];
  dejaRealisee: boolean = false;
  counterSubscription: Subscription;
  niveauTableExpedition: number = 0;
  compteurExpedition: number = 0;
  joueur: JoueurInfos;
  /* leJourSuivant: Date; */

  tempsRestant: string;
  /*   secondesRestantesAvantRefresh: number;
   */
  constructor(private batimentService: BatimentService,
    private batimentJoueurService: BatimentJoueurService,
    private expeditionService: ExpeditionService,
    private expeditionJoueurService: ExpeditionJoueurService,
    private joueurService: JoueurService) { }

  ngOnInit(): void {

    this.verifierNiveauTableExpedition();

    this.calculerTempsRestantAvantReset();
    // Toutes les expeditions
    this.expeditionService.listerExpedition().subscribe(
      (lesExpeditions) => {
        this.listeExpedition = lesExpeditions;
        // Parcours toutes les expeditions
        this.listeExpedition.forEach((uneExpedition) => {
          // Les expeditions joueurs
          this.expeditionJoueurService.listerExpeditionJoueur().subscribe(
            (lesExpeditionsJoueur) => {
              // Parcours les expéditions joueur
              lesExpeditionsJoueur.forEach((uneExpeditionJoueur) => {
                console.log(uneExpeditionJoueur)
                // Si l'id expedition en cours d'analyse = l'id expedition joueur, alors il l'a déjà faite
                if (uneExpeditionJoueur.expedition.id === uneExpedition.id) {
                  uneExpedition.dejaRealisee = true;
                  // Expeditions en cours ? Compteur limite atteinte. Upgade bâtiment necessaire
                  // MAINTENANT
                  var maintenant = new Date().getTime();
                  if (uneExpeditionJoueur.dateFinExpedition > maintenant && uneExpeditionJoueur.etatExpedition == 0) {
                    this.compteurExpedition++;
                  }
                }
              });
            }
          )
        });
      }
    );

        // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
        this.joueurService.informationJoueurByEmail().subscribe(
          (value) => {
            this.joueur = value;
          }
        );
  }

  calculerTempsRestantAvantReset() {
    // Toutes les secondes, actualisation du temps restant
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      () => {
        // Date d'aujourd'hui à minuit
        var aujourdhui = new Date();
        // Date demain à minuit
        var demain = new Date();
        demain.setHours(0, 0, 0, 0);
        demain.setDate(demain.getDate() + 1);
        // Secondes restantes avant demain
        var secondesRestantesAvantRefresh = (demain.getTime() - aujourdhui.getTime()) / 1000;
        // Mise au bon format (hh:mm:ss)
        var date = new Date(null);
        date.setSeconds(secondesRestantesAvantRefresh);
        this.tempsRestant = date.toISOString().substr(11, 8);
      }
    );
  }

  // Cron back 00h00
  refeshExpedition(): void {
    this.expeditionService.refeshExpedition().subscribe();
  }

  // Verification possession bâtiment de type "Table d'expédition"
  verifierNiveauTableExpedition() {
    // Récupération liste des batiments
    this.batimentService.listerBatiments().subscribe(
      () => {
        // Récupération liste des batiments du joueur
        this.batimentJoueurService.listerMesBatiments().subscribe(
          (mesBatiments) => {
            // Boucle sur les bâtiments du joueur
            mesBatiments.forEach((monBatiment) => {
              // SI LE JOUER POSSEDE UNE TABLE D'EXPEDITION (id:18), RECUPERATION DU NIVEAU
              if (monBatiment.batiment.idTypeBatiment == 18) {
                // MAINTENANT
                var maintenant = new Date().getTime();
                // SI TABLE D'EXPEDITION N'EST PAS EN CONSTRUCTION
                if (monBatiment.dateFinConstruction < maintenant) {
                  this.niveauTableExpedition = monBatiment.niveau;
                } else {
                  this.niveauTableExpedition = monBatiment.niveau - 1;
                }
              }
            });
          }
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();

    }
  }

  // COLORATION COUT RESSOURCE
  getColorRessourceManquantePierre(idExpedition : number) {
      var couleur = '';
      this.listeExpedition.forEach(element => {
        if(idExpedition == element.id) {
          if (this.joueur.pierrePossession < element.coutPierre) {
            couleur = 'red';
          } else {
            couleur = 'green';
          }
        }
      });
      return couleur;
  }
  getColorRessourceManquanteBois(idExpedition : number) {
    var couleur = '';
    this.listeExpedition.forEach(element => {
      if(idExpedition == element.id) {
        if (this.joueur.boisPossession < element.coutBois) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteOr(idExpedition : number) {
    var couleur = '';
    this.listeExpedition.forEach(element => {
      if(idExpedition == element.id) {
        if (this.joueur.orPossession < element.coutOr) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  getColorRessourceManquanteNourriture(idExpedition : number) {
    var couleur = '';
    this.listeExpedition.forEach(element => {
      if(idExpedition == element.id) {
        if (this.joueur.nourriturePossession < element.coutNourriture) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  

}
