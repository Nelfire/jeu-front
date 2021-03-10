import { Component, OnInit } from '@angular/core';
import { Joueur } from '../auth/auth.domains';
import { JoueurService } from '../service/joueur.service';
import { JoueurInfos } from '../models/joueur-infos';

@Component({
  selector: 'app-lister-joueur',
  templateUrl: './lister-joueur.component.html',
  styleUrls: ['./lister-joueur.component.scss']
})
export class ListerJoueurComponent implements OnInit {

  // INITIALISATIONS
  listeJoueurs: JoueurInfos[];
  messageErreur: string;

  // CONSTRUCTEUR
  constructor(private joueurService: JoueurService) { }

  // NGONINIT
  ngOnInit(): void {
    this.joueurService.listerInfosJoueurs().subscribe(
      (joueurs) => {
        this.listeJoueurs = joueurs;
      }, (error) => {
        this.messageErreur = error;
      }
    );
  }

}
