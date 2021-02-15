import { Component, OnInit } from '@angular/core';
import * as introJs from 'intro.js/intro.js';
import { JoueurInfos } from '../models/joueur-infos';
import { JoueurService } from '../service/joueur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  
  // INITIALISATIONS
  infosJoueur: JoueurInfos;

  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
  }

}
