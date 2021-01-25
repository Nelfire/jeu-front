import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Expedition } from 'src/app/models/expedition';
import { ExpeditionJoueur } from 'src/app/models/expedition-joueur';
import { ExpeditionJoueurService } from 'src/app/service/expedition-joueur.service';
import { ExpeditionService } from 'src/app/service/expedition.service';

@Component({
  selector: 'app-liste-expeditions',
  templateUrl: './liste-expeditions.component.html',
  styleUrls: ['./liste-expeditions.component.scss']
})
export class ListeExpeditionsComponent implements OnInit {

  // Initialisations 
  listeExpedition = [];
  dejaRealisee: boolean = false;
  counterSubscription: Subscription;
  /* leJourSuivant: Date; */

  tempsRestant: string;
  /*   secondesRestantesAvantRefresh: number;
   */
  constructor(private expeditionService: ExpeditionService,
    private expeditionJoueurService: ExpeditionJoueurService) { }

  ngOnInit(): void {

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
                // Si l'id expedition en cours d'analyse = l'id expedition joueur, alors il l'a déjà faite
                if (uneExpeditionJoueur.expedition.id === uneExpedition.id) {
                  console.log(uneExpedition.id)
                  uneExpedition.dejaRealisee = true;
                }
              });
            }
          )
        });
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

}
