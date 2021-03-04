import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Defense } from 'src/app/models/defense';
import { DefenseService } from 'src/app/service/defense.service';

@Component({
  selector: 'app-modification-defense',
  templateUrl: './modification-defense.component.html',
  styleUrls: ['./modification-defense.component.scss']
})
export class ModificationDefenseComponent implements OnInit {


  // Initialisations
  messageValidation: string;
  messageErreur: string;
  id: number;
  defense: Defense;
  formModificationDefense: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private routerLinkActive: ActivatedRoute,
    private defenseService: DefenseService) { }

  ngOnInit(): void {

    //Initialisation du formulaire vide
    this.formModificationDefense = this.formBuilder.group({
      idTypeDefense: ['', Validators.required],
      typeDefense: ['', Validators.required],
      icone: ['', Validators.required],
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      coutPierreConstruction: ['', Validators.required],
      coutBoisConstruction: ['', Validators.required],
      coutOrConstruction: ['', Validators.required],
      coutNourritureConstruction: ['', Validators.required],
      vie: ['', Validators.required],
      attaque: ['', Validators.required],
      portee: ['', Validators.required],
      armure: ['', Validators.required],
      tempsConstruction: ['', Validators.required],
      niveauBatimentNecessaireConstruction: ['', Validators.required],
      idBatimentProvenance: ['', Validators.required],
      apportExperience: ['', Validators.required]
    });
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    this.defenseService.detailsDefense(this.id).subscribe(
      (value) => {
        this.defense = value;
        this.initialiserFormulaire();
      }
    );
  }

  initialiserFormulaire() {
    //Initialisation du formulaire avec données
    this.formModificationDefense = this.formBuilder.group({
      idTypeDefense: [this.defense.idTypeDefense, Validators.required],
      typeDefense: [this.defense.typeDefense, Validators.required],
      icone: [this.defense.icone, Validators.required],
      libelle: [this.defense.libelle, Validators.required],
      description: [this.defense.description, Validators.required],
      coutPierreConstruction: [this.defense.coutPierreConstruction, Validators.required],
      coutBoisConstruction: [this.defense.coutBoisConstruction, Validators.required],
      coutOrConstruction: [this.defense.coutOrConstruction, Validators.required],
      coutNourritureConstruction: [this.defense.coutNourritureConstruction, Validators.required],
      vie: [this.defense.vie, Validators.required],
      attaque: [this.defense.attaque, Validators.required],
      portee: [this.defense.portee, Validators.required],
      armure: [this.defense.armure, Validators.required],
      tempsConstruction: [this.defense.tempsConstruction, Validators.required],
      niveauBatimentNecessaireConstruction: [this.defense.niveauBatimentNecessaireConstruction, Validators.required],
      idBatimentProvenance: [this.defense.idBatimentProvenance, Validators.required],
      apportExperience: [this.defense.apportExperience, Validators.required]
    });
  }

  modificationDefense() {
    const idTypeDefense = this.formModificationDefense.get('idTypeDefense').value;
    const typeDefense = this.formModificationDefense.get('typeDefense').value;
    const icone = this.formModificationDefense.get('icone').value;
    const libelle = this.formModificationDefense.get('libelle').value;
    const description = this.formModificationDefense.get('description').value;
    const coutPierreConstruction = this.formModificationDefense.get('coutPierreConstruction').value;
    const coutBoisConstruction = this.formModificationDefense.get('coutBoisConstruction').value;
    const coutOrConstruction = this.formModificationDefense.get('coutOrConstruction').value;
    const coutNourritureConstruction = this.formModificationDefense.get('coutNourritureConstruction').value;
    const vie = this.formModificationDefense.get('vie').value;
    const attaque = this.formModificationDefense.get('attaque').value;
    const portee = this.formModificationDefense.get('portee').value;
    const armure = this.formModificationDefense.get('armure').value;
    const tempsConstruction = this.formModificationDefense.get('tempsConstruction').value;
    const niveauBatimentNecessaireConstruction = this.formModificationDefense.get('niveauBatimentNecessaireConstruction').value;
    const idBatimentProvenance = this.formModificationDefense.get('idBatimentProvenance').value;
    const apportExperience = this.formModificationDefense.get('apportExperience').value;
    this.defenseService.administrationModificationDefense(
      this.id,
      idTypeDefense,
      typeDefense,
      icone,
      libelle,
      description,
      coutPierreConstruction,
      coutBoisConstruction,
      coutOrConstruction,
      coutNourritureConstruction,
      vie,
      attaque,
      portee,
      armure,
      tempsConstruction,
      niveauBatimentNecessaireConstruction,
      idBatimentProvenance,
      apportExperience
      ).subscribe(
        () => {

        }, (error) => {
          this.messageErreur = error.error.message;
        }, () => {
          this.messageValidation = "Modification réalisée";
          setTimeout(() => {
            // Redirection au bout de 1,5 secondes
            this.router.navigate(['listeDefense']);
          }, 1500);
        }
      );
  }

}
