import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampagneService } from 'src/app/service/campagne/campagne.service';

@Component({
  selector: 'app-liste-campagne-administration',
  templateUrl: './liste-campagne-administration.component.html',
  styleUrls: ['./liste-campagne-administration.component.scss']
})
export class ListeCampagneAdministrationComponent implements OnInit {

  // INITIALISATIONS
  listeCampagne = [];

  // CONSTRUCTEUR
  constructor(private campagneService: CampagneService) { }

  // NGONINIT
  ngOnInit(): void {
    // LISTER TOUTES LES CAMPAGNES
    this.listerCampagnes();
  }

  listerCampagnes() {
    this.campagneService.listerLesCampagnes().subscribe(
      (lesCampagnes) => {
        this.listeCampagne = lesCampagnes;
      }
    );
  }

  // AFFICHAGE DU BACKGROUND IMAGE EN FONCTION DE L'ETAT BOSS
  recupererBackground(isBoss: Boolean) {
    if (isBoss == true) {
      return 'boss';
    } else if (isBoss == false) {
      return 'normal';
    }
  }

  // BOUTONS FILTRE MONDE
  listerLesCampagnesMonde(numeroMonde: number) {
    this.campagneService.listerLesCampagnesMonde(numeroMonde).subscribe(
      (value) => {
        this.listeCampagne = value;
      }
    )
  }

}
