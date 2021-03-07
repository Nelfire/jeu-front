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

  constructor(private joueurService: JoueurService,
    private router: Router,
    private tutorielService: TutorielService    ) { }

  ngOnInit(): void {
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
  }

  // [TUTORIEL GUIDE] - [PARTIE 1] - Tutoriel de présentation
  lancementTutoriel() {
    this.tutorielService.lancementTutoriel();
  }

}
