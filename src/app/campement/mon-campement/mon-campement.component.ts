import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/auth/auth.domains';
import { Batiment } from 'src/app/models/batiment';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { AuthService } from 'src/app/service/auth.service';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';
import { CampementService } from 'src/app/service/campement.service';

@Component({
  selector: 'app-mon-campement',
  templateUrl: './mon-campement.component.html',
  styleUrls: ['./mon-campement.component.scss']
})
export class MonCampementComponent implements OnInit {

  // Initialisations
  listeBatiments: Batiment[];
  listeMesBatiments: MesBatiments[];
  utilisateurConnecte: Joueur;
  niveauHdvJoueur: number;

  // Constructeur
  constructor(private authSrv: AuthService, private batimentService: BatimentService, private batimentJoueurService: BatimentJoueurService) { }

  ngOnInit(): void {
    // Récupération liste des tous les batiments existants
    this.batimentService.listerBatiments().subscribe(
      (value) => {
        this.listeBatiments = value;
      }
    );


    // On vérifie si l'utilisateur est bien connecté
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => {
        // Récupération liste des batiments du joueur
        this.batimentJoueurService.listerMesBatiments(etatConnexion.id).subscribe(
          (mesBatiments) => {
            this.listeMesBatiments = mesBatiments;
            this.listeMesBatiments.forEach(data => {
              if(data.batiment.idTypeBatiment==1) {
                this.niveauHdvJoueur = data.niveau;
              }
            });
          }
        );
      }
    );

  }

}
