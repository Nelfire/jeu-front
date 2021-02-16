import { Component, OnInit } from '@angular/core';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-liste-unitee',
  templateUrl: './liste-unitee.component.html',
  styleUrls: ['./liste-unitee.component.scss']
})
export class ListeUniteeComponent implements OnInit {

  listeUnitees = [];
  constructor(private uniteeService: UniteeService) { }

  ngOnInit(): void {

    // Récupération liste des batiments (Type:Tous)
    this.uniteeService.listerDifferentesUnitees().subscribe(
      (value) => {
        this.listeUnitees = value;
      }
    );
  }

}
