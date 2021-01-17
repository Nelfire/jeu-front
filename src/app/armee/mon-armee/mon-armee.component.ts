import { Component, OnInit } from '@angular/core';
import { Armee } from 'src/app/models/armee';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-mon-armee',
  templateUrl: './mon-armee.component.html',
  styleUrls: ['./mon-armee.component.scss']
})
export class MonArmeeComponent implements OnInit {

  listeUnitees: Unitee[];
  armeesDuJoueur: Armee[];
  constructor(private uniteeService: UniteeService, private armeeService: ArmeeService) { }

  ngOnInit(): void {

    // Lister les différentes unitées existantes
    this.uniteeService.listerDifferentesUnitees().subscribe(
      (value) => {
        this.listeUnitees = value;
      }
    );

    // Lister des différentes armées du joueurs
    this.armeeService.listerArmeesDuJoueur().subscribe(
      (value) => {
        this.armeesDuJoueur = value;
      }
    );
  }

}
