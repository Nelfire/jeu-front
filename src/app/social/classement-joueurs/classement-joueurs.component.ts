import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/auth/auth.domains';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { JoueurService } from 'src/app/service/joueur.service';

@Component({
  selector: 'app-classement-joueurs',
  templateUrl: './classement-joueurs.component.html',
  styleUrls: ['./classement-joueurs.component.scss']
})
export class ClassementJoueursComponent implements OnInit {

  listeJoueurs: JoueurInfos[];
  messageErreur: string;
  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
    this.joueurService.listerInfosJoueurs().subscribe(
      (joueur) => {
        this.listeJoueurs = joueur;
      }, (error) => {
        this.messageErreur = error;
      }
    );
  }

}
