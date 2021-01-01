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

  listeBatiments : Batiment[];
  listeMesBatiments : MesBatiments[];
  utilisateurConnecte : Joueur;

  constructor(private authSrv: AuthService, private batimentService: BatimentService, private batimentJoueurService: BatimentJoueurService) { }

  ngOnInit(): void {
    // Récupération liste des tous les batiments existants
    this.batimentService.listerBatiments().subscribe(
      (value) => {
        this.listeBatiments = value;
      }
    )
    
    // On v�rifie si l'utilisateur est bien connect�
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => {
        // Récupération liste des batiments du joueur
        this.batimentJoueurService.listerMesBatiments(etatConnexion).subscribe(
          (mesBatiments) => {
            this.listeMesBatiments = mesBatiments;
          }
        )
      }
    );

  }

}
