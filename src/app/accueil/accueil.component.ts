import { Component, OnInit } from '@angular/core';
import { JoueurInfos } from '../models/joueur-infos';
import { JoueurService } from '../service/joueur.service';
import * as introJs from 'intro.js/intro.js';
import { Router } from '@angular/router';
import { TutorielService } from '../service/tutoriel.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  // INITIALISATIONS
  infosJoueur: JoueurInfos;

  // CONSTRUCTEUR
  constructor(private joueurService: JoueurService,
    private router: Router,
    private tutorielService: TutorielService) { }

  //NGONINIT
  ngOnInit(): void {
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
  }

  // [TUTORIEL GUIDE] - [PARTIE 1] - Tutoriel de présentation
  lancementTutoriel() {
    // SCROLL EN HAUT DE LA PAGE
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    // LANCEMENT
    this.tutorielService.lancementTutoriel();
  }

}
