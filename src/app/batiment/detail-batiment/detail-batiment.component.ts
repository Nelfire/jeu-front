import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from 'src/app/auth/auth.domains';
import { AuthService } from '../../service/auth.service';
import { Batiment } from 'src/app/models/batiment';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';

import { JoueurService } from '../../service/joueur.service';
import { JoueurInfos } from '../../models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';

@Component({
  selector: 'app-detail-batiment',
  templateUrl: './detail-batiment.component.html',
  styleUrls: ['./detail-batiment.component.scss']
})
export class DetailBatimentComponent implements OnInit {

  // Initialisations
  idTypeBatiment: number;
  batiment: Batiment;
  messageErreur: String;
  messageValidation: String;
  idBatimentJoueur: number;
  // Permet de savoir si le joueur possède déjà le bâtiment, et connaitre les coûts d'amélioration
  batimentJoueurPossede: MesBatiments;
  // Changement état des boutons
  modeConstructionAmelioration: String = "construction";
  etatBoutonConstruire: String;
  etatBoutonAmeliorer: String;

  // Constructeur
  constructor(private authSrv: AuthService,
    private router: Router,
    private routerLinkActive: ActivatedRoute,
    private batimentService: BatimentService,
    private batimentJoueurService: BatimentJoueurService,
    private joueurService: JoueurService) { }

  ngOnInit(): void {

    // Récupération ID batiment (URL)
    this.idTypeBatiment = this.routerLinkActive.snapshot.params['idTypeBatiment'];
    // Récupération des informations du bâtiment
    this.batimentService.detailsBatiment(this.routerLinkActive.snapshot.params['idTypeBatiment']).subscribe(
      (value) => {
        this.batiment = value;
      }
    );

    // Permet de savoir si le joueur possède déjà le bâtiment, et connaitre les coûts d'amélioration
    this.batimentJoueurService.rechercheBatimentJoueur(this.routerLinkActive.snapshot.params['idTypeBatiment']).subscribe(
      (value) => {
        this.batimentJoueurPossede = value;
        // Petite vérification.
        // Cas 1 : Le joueur ne possède pas le bâtiment
        // Cas 2 : Le joueur possède déjà le bâtiment
        if(value.id==null) {
          this.modeConstructionAmelioration = "construction";
          this.etatBoutonConstruire = "disabled";
          this.etatBoutonAmeliorer = "";
        } else {
          this.modeConstructionAmelioration = "amelioration";
          this.etatBoutonConstruire = "";
          this.etatBoutonAmeliorer = "disabled";
        }
      }
    )

  }

  // Lancement construction du bâtiment
  construire() {
    this.batimentJoueurService.creerBatimentJoueur(this.idTypeBatiment).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = "Il semble y avoir une erreur";
      }, () => {
        this.messageValidation = "Tout est ok";
      }
    );
  }

    // Lancement construction du bâtiment
    ameliorer() {
      this.batimentJoueurService.ameliorerBatimentJoueur(this.batimentJoueurPossede.id).subscribe(
        () => {
        }, (error) => {
          this.messageErreur = "Il semble y avoir une erreur";
        }, () => {
          this.messageValidation = "Tout est ok";
        }
      );
      this.router.navigate(['campement']);
    }
}
