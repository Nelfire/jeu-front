import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Unitee } from 'src/app/models/unitee';
import { CampagneService } from 'src/app/service/campagne/campagne.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-creer-campagne',
  templateUrl: './creer-campagne.component.html',
  styleUrls: ['./creer-campagne.component.scss']
})
export class CreerCampagneComponent implements OnInit {

  // INITIALISATIONS
  listeUnites: Unitee[];
  formCreationCampagne: FormGroup;

  // CONSTRUCTEUR
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private uniteeService: UniteeService,
    private campagneService: CampagneService,
    private notification: NotificationService) { }

  // NGONINIT
  ngOnInit(): void {
    // LISTER LES UNITES (Pour le select option)
    this.uniteeService.listerDifferentesUnitees().subscribe(
      (value) => {
        this.listeUnites = value;
      }
    );

    // INITIALISATION DU FORMULAIRE
    this.initialiserFormulaire();
  }

  initialiserFormulaire() {
    //Initialisation du formulaire vide
    this.formCreationCampagne = this.formBuilder.group({
      icone: ['', Validators.required],
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
      monde: ['', Validators.required],
      niveau: ['', Validators.required],
      unitee: ['', Validators.required],
      quantitee: ['', Validators.required],
      isBoss: ['', Validators.required],
      recompensePierre: ['', Validators.required],
      recompenseBois: ['', Validators.required],
      recompenseOr: ['', Validators.required],
      recompenseNourriture: ['', Validators.required],
      recompenseGemme: ['', Validators.required],
      recompenseExperience: ['', Validators.required]
    });
  }

  creationCampagne() {
    const icone = this.formCreationCampagne.get('icone').value;
    const libelle = this.formCreationCampagne.get('libelle').value;
    const description = this.formCreationCampagne.get('description').value;
    const duree = this.formCreationCampagne.get('duree').value;
    const monde = this.formCreationCampagne.get('monde').value;
    const niveau = this.formCreationCampagne.get('niveau').value;
    const unitee = this.formCreationCampagne.get('unitee').value;
    const quantitee = this.formCreationCampagne.get('quantitee').value;
    const isBoss = this.formCreationCampagne.get('isBoss').value;
    const recompensePierre = this.formCreationCampagne.get('recompensePierre').value;
    const recompenseBois = this.formCreationCampagne.get('recompenseBois').value;
    const recompenseOr = this.formCreationCampagne.get('recompenseOr').value;
    const recompenseNourriture = this.formCreationCampagne.get('recompenseNourriture').value;
    const recompenseGemme = this.formCreationCampagne.get('recompenseGemme').value;
    const recompenseExperience = this.formCreationCampagne.get('recompenseExperience').value;
    this.campagneService.administrationCreationCampagne(
      icone,
      libelle,
      description,
      duree,
      monde,
      niveau,
      unitee,
      quantitee,
      isBoss,
      recompensePierre,
      recompenseBois,
      recompenseOr,
      recompenseNourriture,
      recompenseGemme,
      recompenseExperience
    ).subscribe(
      () => {

      }, (error) => {
        this.notification.showError("", error.error.message);
      }, () => {
        this.notification.showSuccess("", "Création réussi");
        this.router.navigate(['/listeCampagneAdministration']);
      }
    );
  }
}
