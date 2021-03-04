import { Component, OnInit } from '@angular/core';
import { Campagne } from 'src/app/models/campagne';
import { CampagneService } from 'src/app/service/campagne/campagne.service';

@Component({
  selector: 'app-liste-campagnes',
  templateUrl: './liste-campagnes.component.html',
  styleUrls: ['./liste-campagnes.component.scss']
})
export class ListeCampagnesComponent implements OnInit {

  lesCampagnes: Campagne[];

  constructor(private campagneService: CampagneService) { }

  ngOnInit(): void {
    this.campagneService.listerLesCampagnes().subscribe(
      (value) => {
        this.lesCampagnes = value;
      }
    )
  }

}
