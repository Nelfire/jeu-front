import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from 'src/app/auth/auth.domains';
import { AuthService } from '../../service/auth.service';
import { Batiment } from 'src/app/models/batiment';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';

import { JoueurService } from '../../service/joueur.service';
import { JoueurInfos } from '../../models/joueur-infos';

@Component({
  selector: 'app-detail-batiment',
  templateUrl: './detail-batiment.component.html',
  styleUrls: ['./detail-batiment.component.scss']
})
export class DetailBatimentComponent implements OnInit {

  idTypeBatiment: number;
  batiment: Batiment;
  messageErreur: String;
  messageValidation: String;

  constructor(private authSrv: AuthService, 
    private router: Router, 
    private routerLinkActive: ActivatedRoute, 
    private batimentService: BatimentService, 
    private batimentJoueurService: BatimentJoueurService,
    private joueurService: JoueurService) { }

  ngOnInit(): void {

    this.idTypeBatiment = this.routerLinkActive.snapshot.params['idTypeBatiment'];
    this.batimentService.detailsBatiment(this.routerLinkActive.snapshot.params['idTypeBatiment']).subscribe(
      (value) => {
        this.batiment = value;
      }
    )
  }

  // Snapshot pour récupérer l'id passé via l'url
  construire() {
    console.log(this.batiment);
    this.batimentJoueurService.creerBatimentJoueur(this.idTypeBatiment).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = "Il semble y avoir une erreur";
      }, () => {
        this.messageValidation = "Tout est ok";
      }
    );
  }
}
