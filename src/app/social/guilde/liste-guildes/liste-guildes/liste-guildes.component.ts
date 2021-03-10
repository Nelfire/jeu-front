import { Component, OnInit } from '@angular/core';
import { Guilde } from 'src/app/models/guilde';
import { GuildeService } from 'src/app/service/guilde.service';

@Component({
  selector: 'app-liste-guildes',
  templateUrl: './liste-guildes.component.html',
  styleUrls: ['./liste-guildes.component.scss']
})
export class ListeGuildesComponent implements OnInit {

  // INITIALISATION
  listeGuildes: Guilde[];

  // CONSTRUCTEUR
  constructor(private guildeService: GuildeService) { }

  // NGONINIT
  ngOnInit(): void {
    // RECUPERATION DE TOUTES LES GUILDES
    this.guildeService.listerGuildes().subscribe(
      (listeDesGuildes) => {
        this.listeGuildes = listeDesGuildes;
      }
    )
  }

}
