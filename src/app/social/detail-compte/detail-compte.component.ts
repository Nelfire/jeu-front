import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { JoueurService } from 'src/app/service/joueur.service';

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.scss']
})
export class DetailCompteComponent implements OnInit {


  // INITILISATIONS
  joueur: JoueurInfos;
  joueurConnecte: JoueurInfos;
  messageErreur: string;
  constructor(private joueurService: JoueurService, private routerLinkActive: ActivatedRoute) { }

  ngOnInit(): void {

    // Données du Joueur connecté
    this.joueurService.informationJoueurByEmail().subscribe(
      (donnees) => {
        this.joueurConnecte = donnees;
      }, (error) => {
        this.messageErreur = "Erreur dans le traitement : " + error;
      }
    );

    // Rï¿½cupï¿½ration informations du collegue connectï¿½ (email) pour la vï¿½rification suivante.
    this.joueurService.informationJoueurById(this.routerLinkActive.snapshot.params['id']).subscribe(
      (donnees) => {
        this.joueur = donnees;
      }, (error) => {
        this.messageErreur = "Erreur dans le traitement : " + error;
      }, () => {
        // Tout est ok
      }
    );

  }
}
