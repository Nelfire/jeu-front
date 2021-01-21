import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ExpeditionJoueur } from 'src/app/models/expedition-joueur';
import { ExpeditionJoueurService } from 'src/app/service/expedition-joueur.service';

@Component({
  selector: 'app-liste-expeditions-joueur',
  templateUrl: './liste-expeditions-joueur.component.html',
  styleUrls: ['./liste-expeditions-joueur.component.scss']
})
export class ListeExpeditionsJoueurComponent implements OnInit {

  result: string;
  counterSubscription: Subscription;

  listeExpeditionJoueur= [];
  secondesRestantesExpedition: number;


  constructor(private expeditionJoueurService: ExpeditionJoueurService) { }

  ngOnInit(): void {
    this.expeditionJoueurService.listerExpeditionJoueur().subscribe(
      (expeditionJoueur) => {
        this.listeExpeditionJoueur = expeditionJoueur;

        this.listeExpeditionJoueur.forEach((uneExpedition) => {
          var dateMaintenantMillisecondes = new Date().getTime();
          // on formate la date de de fin de l'expedition au format 'yyyy-MM-dd hh:mm:ss'
          // Si l'expedition est en cours
          console.log("BLOUP : "+ dateMaintenantMillisecondes);
          console.log("BLOUP : "+ uneExpedition.dateFinExpedition);
          if (dateMaintenantMillisecondes < uneExpedition.dateFinExpedition) {
            uneExpedition.secondesRestantesAmelioration = (uneExpedition.dateFinExpedition - dateMaintenantMillisecondes) / 1000;
            uneExpedition.flagEnCoursDeTravail = true;
            // Définis l'interval de l'appel à 1000 ms (1 seconde)
            const compteur = Observable.interval(1000);
            this.counterSubscription = compteur.subscribe(
              (valeur: number) => {
                // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                uneExpedition.secondesRestantesAmelioration--;
                uneExpedition.dateFinExpedition = uneExpedition.secondesRestantesAmelioration;
                var date = new Date(null);
                date.setSeconds(uneExpedition.dateFinExpedition);
                uneExpedition.date = date.toISOString().substr(11, 8);
              }
            );
          }
        });

      }
    )
  }

  recupererRecompense(idExpedition: number) {
    console.log(idExpedition);
    this.expeditionJoueurService.recupererRecompense(idExpedition).subscribe();
  }

}
