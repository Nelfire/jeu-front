import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
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
  formCreationUnitee: FormGroup;

  // Constructeur
  constructor(private routerLinkActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private uniteeService: UniteeService,
    private armeeService: ArmeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    this.uniteeService.detailsUnitee(this.id).subscribe(
      (value) => {
        this.unitee = value;
      }
    );
  }

  initForm () {
    this.formCreationUnitee = this.formBuilder.group({
      quantitee: ['', Validators.required],
    });
  }

  produireUnitee() {
    console.log(this.id);
    const quantite = this.formCreationUnitee.get('quantitee').value;
    this.armeeService.produireUnitee(this.id,quantite).subscribe();
    this.messageValidation = "Production lancée"
    setTimeout(() => {
      // Redirection au bout de 1,5 secondes
      this.router.navigate(['armee']);
    }, 2000);
  }

}
