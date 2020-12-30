import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Joueur } from 'src/app/auth/auth.domains';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { Competence } from 'src/app/models/competence';
import { JoueurService } from 'src/app/service/joueur.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modifier-joueur',
  templateUrl: './modifier-joueur.component.html',
  styleUrls: ['./modifier-joueur.component.scss']
})
export class ModifierJoueurComponent implements OnInit {

  // https://www.npmjs.com/package/ng-multiselect-dropdown
    // Icones
    faCheck = faCheck;
    faTimes = faTimes;

  formModificationJoueur: FormGroup;
  joueur: JoueurInfos;
  messageValidation: string;
  messageErreur: string;
  listeCompetencesDisponnibles: Competence[];

  email: string;
  constructor(private activatedRoute: ActivatedRoute, private joueurService: JoueurService, private formBuilder: FormBuilder, private competenceService: CompetenceService) { }

  ngOnInit(): void {

        // Initialisation du formulaire vide.
        this.formModificationJoueur = this.formBuilder.group({
          urlPhoto : ['', Validators.required],
          email : ['', Validators.required],
          nom : ['', Validators.required],
          prenom : ['', Validators.required]
        });

    // Données Joueur
    this.email = this.activatedRoute.snapshot.params['email'];
    this.joueurService.informationJoueurByEmail(this.activatedRoute.snapshot.params['email']).subscribe(
      (donnees) => {
        this.joueur = donnees;
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
    this.formModificationJoueur = this.formBuilder.group({
      urlPhoto : [this.joueur.urlPhoto, Validators.required],
      email : [this.joueur.email, Validators.required],
      nom : [this.joueur.nom, Validators.required],
      prenom : [this.joueur.prenom, Validators.required]
    });
  }

  validerFormulaire() {
    
  }

}
