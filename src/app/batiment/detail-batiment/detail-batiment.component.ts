import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Batiment } from 'src/app/models/batiment';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';

@Component({
  selector: 'app-detail-batiment',
  templateUrl: './detail-batiment.component.html',
  styleUrls: ['./detail-batiment.component.scss']
})
export class DetailBatimentComponent implements OnInit {

  idTypeBatiment: number;
  batiment: Batiment;

  constructor(private router: Router, private routerLinkActive: ActivatedRoute, private batimentService: BatimentService, private batimentJoueurService: BatimentJoueurService) { }

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
    console.log(this.idTypeBatiment);
  }
}
