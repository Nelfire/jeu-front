import { Component, OnInit } from '@angular/core';
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
  listeExpedition=[];
  dejaRealisee:boolean = false;
  constructor(private expeditionService: ExpeditionService,
    private expeditionJoueurService: ExpeditionJoueurService) { }

  ngOnInit(): void {

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
                if(uneExpeditionJoueur.expedition.id === uneExpedition.id) {
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

}
