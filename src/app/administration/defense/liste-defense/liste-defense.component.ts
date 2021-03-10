import { Component, OnInit } from '@angular/core';
import { DefenseService } from 'src/app/service/defense.service';

@Component({
  selector: 'app-liste-defense',
  templateUrl: './liste-defense.component.html',
  styleUrls: ['./liste-defense.component.scss']
})
export class ListeDefenseComponent implements OnInit {

  // INITIALISATIONS
  listeDefenses = [];

  // CONSTRUCTEUR
  constructor(private defenseService: DefenseService) { }

  //NGONINIT
  ngOnInit(): void {
    // Récupération liste des batiments (Type:Tous)
    this.defenseService.listerDefense().subscribe(
      (value) => {
        this.listeDefenses = value;
      }
    );
  }

}
