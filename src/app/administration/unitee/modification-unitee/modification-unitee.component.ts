import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Unitee } from 'src/app/models/unitee';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-modification-unitee',
  templateUrl: './modification-unitee.component.html',
  styleUrls: ['./modification-unitee.component.scss']
})
export class ModificationUniteeComponent implements OnInit {

  // INITIALISATIONS
  messageValidation: string;
  messageErreur: string;
  id: number;
  unitee: Unitee;
  formModificationUnitee: FormGroup;

  // CONSTRUCTEUR
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private routerLinkActive: ActivatedRoute,
    private uniteeService: UniteeService) { }

  //NGONINIT
  ngOnInit(): void {

    //Initialisation du formulaire vide
    this.formModificationUnitee = this.formBuilder.group({
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
      vitesse: ['', Validators.required],
      niveauBatimentNecessaireFormation: ['', Validators.required],
      apportRessourcePierreHeure: ['', Validators.required],
      apportRessourceBoisHeure: ['', Validators.required],
      apportRessourceOrHeure: ['', Validators.required],
      apportRessourceNourritureHeure: ['', Validators.required],
      apportExperience: ['', Validators.required]
    });
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    this.uniteeService.detailsUnitee(this.id).subscribe(
      (value) => {
        this.unitee = value;
        this.initialiserFormulaire();
      }
    );
  }


  initialiserFormulaire() {
    //Initialisation du formulaire avec données
    this.formModificationUnitee = this.formBuilder.group({
      idTypeUnitee: [this.unitee.idTypeUnitee, Validators.required],
      idBatimentProvenance: [this.unitee.idBatimentProvenance, Validators.required],
      icone: [this.unitee.icone, Validators.required],
      libelle: [this.unitee.libelle, Validators.required],
      descriptif: [this.unitee.descriptif, Validators.required],
      coutPierreFormation: [this.unitee.coutPierreFormation, Validators.required],
      coutBoisFormation: [this.unitee.coutBoisFormation, Validators.required],
      coutOrFormation: [this.unitee.coutOrFormation, Validators.required],
      coutNourritureFormation: [this.unitee.coutNourritureFormation, Validators.required],
      coutHumain: [this.unitee.coutHumain, Validators.required],
      tempsFormation: [this.unitee.tempsFormation, Validators.required],
      vie: [this.unitee.vie, Validators.required],
      attaque: [this.unitee.attaque, Validators.required],
      portee: [this.unitee.portee, Validators.required],
      armure: [this.unitee.armure, Validators.required],
      vitesse: [this.unitee.vitesse, Validators.required],
      niveauBatimentNecessaireFormation: [this.unitee.niveauBatimentNecessaireFormation, Validators.required],
      apportRessourcePierreHeure: [this.unitee.apportRessourcePierreHeure, Validators.required],
      apportRessourceBoisHeure: [this.unitee.apportRessourceBoisHeure, Validators.required],
      apportRessourceOrHeure: [this.unitee.apportRessourceOrHeure, Validators.required],
      apportRessourceNourritureHeure: [this.unitee.apportRessourceNourritureHeure, Validators.required],
      apportExperience: [this.unitee.apportExperience, Validators.required]
    });
  }

  modificationUnitee() {
    const idTypeUnitee = this.formModificationUnitee.get('idTypeUnitee').value;
    const idBatimentProvenance = this.formModificationUnitee.get('idBatimentProvenance').value;
    const icone = this.formModificationUnitee.get('icone').value;
    const libelle = this.formModificationUnitee.get('libelle').value;
    const descriptif = this.formModificationUnitee.get('descriptif').value;
    const coutPierreFormation = this.formModificationUnitee.get('coutPierreFormation').value;
    const coutBoisFormation = this.formModificationUnitee.get('coutBoisFormation').value;
    const coutOrFormation = this.formModificationUnitee.get('coutOrFormation').value;
    const coutNourritureFormation = this.formModificationUnitee.get('coutNourritureFormation').value;
    const coutHumain = this.formModificationUnitee.get('coutHumain').value;
    const tempsFormation = this.formModificationUnitee.get('tempsFormation').value;
    const vie = this.formModificationUnitee.get('vie').value;
    const attaque = this.formModificationUnitee.get('attaque').value;
    const portee = this.formModificationUnitee.get('portee').value;
    const armure = this.formModificationUnitee.get('armure').value;
    const vitesse = this.formModificationUnitee.get('vitesse').value;
    const niveauBatimentNecessaireFormation = this.formModificationUnitee.get('niveauBatimentNecessaireFormation').value;
    const apportRessourcePierreHeure = this.formModificationUnitee.get('apportRessourcePierreHeure').value;
    const apportRessourceBoisHeure = this.formModificationUnitee.get('apportRessourceBoisHeure').value;
    const apportRessourceOrHeure = this.formModificationUnitee.get('apportRessourceOrHeure').value;
    const apportRessourceNourritureHeure = this.formModificationUnitee.get('apportRessourceNourritureHeure').value;
    const apportExperience = this.formModificationUnitee.get('apportExperience').value;
    this.uniteeService.administrationModificationUnitee(
      this.id,
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
      vitesse,
      niveauBatimentNecessaireFormation,
      apportRessourcePierreHeure,
      apportRessourceBoisHeure,
      apportRessourceOrHeure,
      apportRessourceNourritureHeure,
      apportExperience
    ).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = error.error.message;
      }, () => {
        this.messageValidation = "Modification réalisée";
        setTimeout(() => {
          // Redirection au bout de 1,5 secondes
          this.router.navigate(['creationUnitee']);
        }, 1500);
      }
    );
  }

}
