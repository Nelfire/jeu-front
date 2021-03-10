import { Component, OnInit } from '@angular/core';
import { BatimentService } from 'src/app/service/batiment.service';

@Component({
  selector: 'app-liste-batiment',
  templateUrl: './liste-batiment.component.html',
  styleUrls: ['./liste-batiment.component.scss']
})
export class ListeBatimentComponent implements OnInit {

  // INITIALISATIONS
  listeBatiments = [];

  // CONSTRUCTEUR
  constructor(private batimentService: BatimentService) { }

  //NGONINIT
  ngOnInit(): void {

    // Récupération liste des batiments (Type:Tous)
    this.batimentService.listerBatiments().subscribe(
      (value) => {
        this.listeBatiments = value;
      }
    );
  }

}
