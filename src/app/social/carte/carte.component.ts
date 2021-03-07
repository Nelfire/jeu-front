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

  numbers : any = Array.from(Array(31)).map((x, i) => i );

  joueurConnecte: JoueurInfos;
  listeJoueurs: JoueurInfos[];
  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
    this.joueurService.listerInfosJoueurs().subscribe(
      (value) => {
        this.listeJoueurs = value;
      }
    );
    this.joueurService.informationJoueurByEmail().subscribe(
      (val) => {
        this.joueurConnecte = val;
      }
    )
  }

}
