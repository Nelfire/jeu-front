import { Component, OnInit } from '@angular/core';
import { Unitee } from 'src/app/models/unitee';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-mon-armee',
  templateUrl: './mon-armee.component.html',
  styleUrls: ['./mon-armee.component.scss']
})
export class MonArmeeComponent implements OnInit {

  listeUnitees: Unitee[];
  constructor(private uniteeService: UniteeService) { }

  ngOnInit(): void {
    this.uniteeService.listerDifferentesUnitees().subscribe(
      (value) => {
        this.listeUnitees = value;
      }
    );
  }

}
