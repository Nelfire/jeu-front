import { Component, OnInit } from '@angular/core';
import { Expedition } from 'src/app/models/expedition';
import { ExpeditionService } from 'src/app/service/expedition.service';

@Component({
  selector: 'app-liste-expeditions',
  templateUrl: './liste-expeditions.component.html',
  styleUrls: ['./liste-expeditions.component.scss']
})
export class ListeExpeditionsComponent implements OnInit {

  // Initialisations 
  listeExpedition: Expedition[];
  constructor(private expeditionService: ExpeditionService) { }

  ngOnInit(): void {

    this.expeditionService.listerExpedition().subscribe(
      (value) => {
        this.listeExpedition = value;
      }
    )
  }

}
