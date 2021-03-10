import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campagne } from 'src/app/models/campagne';
import { Unitee } from 'src/app/models/unitee';
import { CampagneService } from 'src/app/service/campagne/campagne.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-modification-campagne',
  templateUrl: './modification-campagne.component.html',
  styleUrls: ['./modification-campagne.component.scss']
})
export class ModificationCampagneComponent implements OnInit {

  // INITIALISATIONS
  listeUnites: Unitee[];
  formModificationCampagne: FormGroup;
  id: number;
  campagne: Campagne;

  // CONSTRUCTEUR
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private routerLinkActive: ActivatedRoute,
    private uniteeService: UniteeService,
    private campagneService: CampagneService,
    private notification: NotificationService) { }

  //NGONINIT
  ngOnInit(): void {
    // LISTER LES UNITES (Pour le select option)
    this.uniteeService.listerDifferentesUnitees().subscribe(
      (value) => {
        this.listeUnites = value;
      }
    );

    //Initialisation du formulaire vide
    this.formModificationCampagne = this.formBuilder.group({
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
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    // DETAILS DE LA CAMPAGNE
    this.campagneService.detailsCampagne(this.id).subscribe(
      (valueCampagne) => {
        this.campagne = valueCampagne;
        this.initialiserFormulaire();
      }
    )
  }


  initialiserFormulaire() {
    //Initialisation du formulaire avec données
    this.formModificationCampagne = this.formBuilder.group({
      icone: [this.campagne.icone, Validators.required],
      libelle: [this.campagne.libelle, Validators.required],
      description: [this.campagne.description, Validators.required],
      duree: [this.campagne.duree, Validators.required],
      monde: [this.campagne.monde, Validators.required],
      niveau: [this.campagne.niveau, Validators.required],
      unitee: [this.campagne.unitee, Validators.required],
      quantitee: [this.campagne.quantitee, Validators.required],
      isBoss: [this.campagne.isBoss, Validators.required],
      recompensePierre: [this.campagne.recompensePierre, Validators.required],
      recompenseBois: [this.campagne.recompenseBois, Validators.required],
      recompenseOr: [this.campagne.recompenseOr, Validators.required],
      recompenseNourriture: [this.campagne.recompenseNourriture, Validators.required],
      recompenseGemme: [this.campagne.recompenseGemme, Validators.required],
      recompenseExperience: [this.campagne.recompenseExperience, Validators.required]
    });
  }

  modificationCampagne() {
    const icone = this.formModificationCampagne.get('icone').value;
    const libelle = this.formModificationCampagne.get('libelle').value;
    const description = this.formModificationCampagne.get('description').value;
    const duree = this.formModificationCampagne.get('duree').value;
    const monde = this.formModificationCampagne.get('monde').value;
    const niveau = this.formModificationCampagne.get('niveau').value;
    const unitee = this.formModificationCampagne.get('unitee').value;
    const quantitee = this.formModificationCampagne.get('quantitee').value;
    const isBoss = this.formModificationCampagne.get('isBoss').value;
    const recompensePierre = this.formModificationCampagne.get('recompensePierre').value;
    const recompenseBois = this.formModificationCampagne.get('recompenseBois').value;
    const recompenseOr = this.formModificationCampagne.get('recompenseOr').value;
    const recompenseNourriture = this.formModificationCampagne.get('recompenseNourriture').value;
    const recompenseGemme = this.formModificationCampagne.get('recompenseGemme').value;
    const recompenseExperience = this.formModificationCampagne.get('recompenseExperience').value;
    this.campagneService.administrationModificationCampagne(
      this.id,
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
        this.notification.showSuccess("", "Modification validée");
        this.router.navigate(['/listeCampagneAdministration']);
      }
    );

  }

}
