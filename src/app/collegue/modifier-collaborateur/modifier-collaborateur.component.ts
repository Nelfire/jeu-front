import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Collegue } from 'src/app/auth/auth.domains';
import { CollegueInfos } from 'src/app/models/collegue-infos';
import { Competence } from 'src/app/models/competence';
import { CollegueService } from 'src/app/service/collegue.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modifier-collaborateur',
  templateUrl: './modifier-collaborateur.component.html',
  styleUrls: ['./modifier-collaborateur.component.scss']
})
export class ModifierCollaborateurComponent implements OnInit {

  // https://www.npmjs.com/package/ng-multiselect-dropdown
    // Icones
    faCheck = faCheck;
    faTimes = faTimes;

  formModificationCollaborateur: FormGroup;
  collegue: CollegueInfos;
  messageValidation: string;
  messageErreur: string;
  listeCompetencesDisponnibles: Competence[];

  email: string;
  constructor(private activatedRoute: ActivatedRoute, private collegueService: CollegueService, private formBuilder: FormBuilder, private competenceService: CompetenceService) { }

  ngOnInit(): void {

        // Initialisation du formulaire vide.
        this.formModificationCollaborateur = this.formBuilder.group({
          urlPhoto : ['', Validators.required],
          email : ['', Validators.required],
          nom : ['', Validators.required],
          prenom : ['', Validators.required]
        });

    // Données Collegue
    this.email = this.activatedRoute.snapshot.params['email'];
    this.collegueService.informationCollegueByEmail(this.activatedRoute.snapshot.params['email']).subscribe(
      (donnees) => {
        this.collegue = donnees;
        this.initForm();
      }, (error) => {
        this.messageErreur = "Erreur dans le traitement : "+ error;
      }, () => {
        // Tout est ok
      }
    )

    // Données Compétences

    this.competenceService.listerCompetence().subscribe(
      (value) => {
        this.listeCompetencesDisponnibles = value;
      }
    )
    
  }

  initForm() {
    this.formModificationCollaborateur = this.formBuilder.group({
      urlPhoto : [this.collegue.urlPhoto, Validators.required],
      email : [this.collegue.email, Validators.required],
      nom : [this.collegue.nom, Validators.required],
      prenom : [this.collegue.prenom, Validators.required]
    });
  }

  validerFormulaire() {
    
  }

}
