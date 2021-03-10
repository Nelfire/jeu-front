import { Component, OnInit } from '@angular/core';
import { JoueurService } from 'src/app/service/joueur.service';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { Joueur } from 'src/app/auth/auth.domains';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  // INITIALISATIONS
  numbers: any = Array.from(Array(31)).map((x, i) => i); // 30x30
  joueurConnecte: JoueurInfos;
  listeJoueurs: JoueurInfos[];

  // CONSTRUCTEUR
  constructor(private joueurService: JoueurService) { }

  // NGONINIT
  ngOnInit(): void {

    // RECHERCHE DE TOUS LES JOUEURS
    this.joueurService.listerInfosJoueurs().subscribe(
      (value) => {
        this.listeJoueurs = value;
      }
    );

    // INFORMATIONS DU JOUEUR CONNECT
    this.joueurService.informationJoueurByEmail().subscribe(
      (val) => {
        this.joueurConnecte = val;
      }
    )
  }

}
