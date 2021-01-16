import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unitee } from 'src/app/models/unitee';
import { JoueurService } from 'src/app/service/joueur.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-detail-unitee',
  templateUrl: './detail-unitee.component.html',
  styleUrls: ['./detail-unitee.component.scss']
})
export class DetailUniteeComponent implements OnInit {

  // Initialisations
  id: number;
  unitee: Unitee;
  messageErreur: string;
  messageValidation: string;

  // Constructeur
  constructor(private routerLinkActive: ActivatedRoute,
    private uniteeService: UniteeService,
    private joueurService: JoueurService) { }

  ngOnInit(): void {
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    this.uniteeService.detailsUnitee(this.id).subscribe(
      (value) => {
        this.unitee = value;
      }
    );
  }

  produireUnitee() {
    this.uniteeService.produireUnitee(this.id).subscribe();
  }

}
