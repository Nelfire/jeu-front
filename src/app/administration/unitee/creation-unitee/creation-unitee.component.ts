import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unitee } from 'src/app/models/unitee';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-creation-unitee',
  templateUrl: './creation-unitee.component.html',
  styleUrls: ['./creation-unitee.component.scss']
})
export class CreationUniteeComponent implements OnInit {


  // Initialisations 
  messageErreur: string;
  messageValidation: string;
  formCreationUnitee: FormGroup;
  listeUnitees: Unitee[];
  constructor(private formBuilder: FormBuilder, private uniteeService: UniteeService) { }

  ngOnInit(): void {
    this.initForm();
    this.uniteeService.listerDifferentesUnitees().subscribe(
      (value) => {
        this.listeUnitees = value;
      }
    );
  }

  initForm () {
    this.formCreationUnitee = this.formBuilder.group({
      idTypeUnitee: ['', Validators.required],
      idBatimentProvenance: ['', Validators.required],
      icone: ['', Validators.required],
      libelle: ['', Validators.required],
      descriptif: ['', Validators.required],
      coutPierreFormation: ['', Validators.required],
      coutBoisFormation: ['', Validators.required],
      coutOrFormation: ['', Validators.required],
      coutNourritureFormation: ['', Validators.required],
      coutHumain: ['', Validators.required],
      tempsFormation: ['', Validators.required],
      vie: ['', Validators.required],
      attaque: ['', Validators.required],
      portee: ['', Validators.required],
      armure: ['', Validators.required],
      niveauBatimentNecessaireFormation: ['', Validators.required],
      apportRessourcePierreHeure: ['', Validators.required],
      apportRessourceBoisHeure: ['', Validators.required],
      apportRessourceOrHeure: ['', Validators.required],
      apportRessourceNourritureHeure: ['', Validators.required]
    });
  }
  creationUnitee() {
    const idTypeUnitee = this.formCreationUnitee.get('idTypeUnitee').value;
    const idBatimentProvenance = this.formCreationUnitee.get('idBatimentProvenance').value;
    const icone = this.formCreationUnitee.get('icone').value;
    const libelle = this.formCreationUnitee.get('libelle').value;
    const descriptif = this.formCreationUnitee.get('descriptif').value;
    const coutPierreFormation = this.formCreationUnitee.get('coutPierreFormation').value;
    const coutBoisFormation = this.formCreationUnitee.get('coutBoisFormation').value;
    const coutOrFormation = this.formCreationUnitee.get('coutOrFormation').value;
    const coutNourritureFormation = this.formCreationUnitee.get('coutNourritureFormation').value;
    const coutHumain = this.formCreationUnitee.get('coutHumain').value;
    const tempsFormation = this.formCreationUnitee.get('tempsFormation').value;
    const vie = this.formCreationUnitee.get('vie').value;
    const attaque = this.formCreationUnitee.get('attaque').value;
    const portee = this.formCreationUnitee.get('portee').value;
    const armure = this.formCreationUnitee.get('armure').value;
    const niveauBatimentNecessaireFormation = this.formCreationUnitee.get('niveauBatimentNecessaireFormation').value;
    const apportRessourcePierreHeure = this.formCreationUnitee.get('apportRessourcePierreHeure').value;
    const apportRessourceBoisHeure = this.formCreationUnitee.get('apportRessourceBoisHeure').value;
    const apportRessourceOrHeure = this.formCreationUnitee.get('apportRessourceOrHeure').value;
    const apportRessourceNourritureHeure = this.formCreationUnitee.get('apportRessourceNourritureHeure').value;
    this.uniteeService.administrationCreationUnitee(
      idTypeUnitee,
      idBatimentProvenance,
      icone,
      libelle,
      descriptif,
      coutPierreFormation,
      coutBoisFormation,
      coutOrFormation,
      coutNourritureFormation,
      coutHumain,
      tempsFormation,
      vie,
      attaque,
      portee,
      armure,
      niveauBatimentNecessaireFormation,
      apportRessourcePierreHeure,
      apportRessourceBoisHeure,
      apportRessourceOrHeure,apportRessourceNourritureHeure,
      ).subscribe();
    /*
      coutBoisFormation: `${unitee.coutBoisFormation}`,
      coutOrFormation: `${unitee.coutOrFormation}`,
      : `${unitee.coutNourritureFormation}`,
      : `${unitee.coutHumain}`,
      : `${unitee.tempsFormation}`,
      : `${unitee.vie}`,
      : `${unitee.attaque}`,
      : `${unitee.portee}`,
      : `${unitee.armure}`,
      : `${unitee.niveauBatimentNecessaireFormation}`,
      : `${unitee.apportRessourcePierreHeure}`,
      : `${unitee.apportRessourceBoisHeure}`,
      : `${unitee.apportRessourceOrHeure}`,
      : `${unitee.apportRessourceNourritureHeure}` 
    */
  }

}
