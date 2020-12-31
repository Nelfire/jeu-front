import { Component, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { BatimentService } from 'src/app/service/batiment.service';
import { CampementService } from 'src/app/service/campement.service';

@Component({
  selector: 'app-mon-campement',
  templateUrl: './mon-campement.component.html',
  styleUrls: ['./mon-campement.component.scss']
})
export class MonCampementComponent implements OnInit {

  listeBatiments : Batiment[];

  constructor(private batimentService: BatimentService) { }

  ngOnInit(): void {
    this.batimentService.listerBatiments().subscribe(
      (value) => {
        this.listeBatiments = value;
      }
    )
  }

}
