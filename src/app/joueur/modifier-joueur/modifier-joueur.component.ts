import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from 'src/app/auth/auth.domains';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { Competence } from 'src/app/models/competence';
import { JoueurService } from 'src/app/service/joueur.service';
import { CompetenceService } from 'src/app/service/competence.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@angular/compiler/src/core';

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
  email: string;

  constructor(private activatedRoute: ActivatedRoute, 
    private joueurService: JoueurService, 
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    // Initialisation du formulaire vide.
    this.formModificationJoueur = this.formBuilder.group({
      pseudo: ['', Validators.required],
      icone: ['', Validators.required],
      email: ['', Validators.required],
      descriptif: ['', Validators.required]
    });

    // Données du Joueur connecté
    this.joueurService.informationJoueurByEmail().subscribe(
      (donnees) => {
        this.joueur = donnees;
        this.initForm();
      }, (error) => {
        this.messageErreur = "Erreur dans le traitement : " + error;
      }
    );


  }

  initForm() {

    this.formModificationJoueur = this.formBuilder.group({
      pseudo: [this.joueur.pseudo, Validators.required],
      icone: [this.joueur.icone, Validators.required],
      email: [this.joueur.email, Validators.required],
      descriptif: [this.joueur.descriptif, Validators.required]
    });
  }

  validerFormulaire() {

    const icone = this.formModificationJoueur.get("icone").value;
    const email = this.formModificationJoueur.get("email").value;
    const descriptif = this.formModificationJoueur.get("descriptif").value;

    this.joueurService.modifierInformationsJoueur(icone,email,descriptif).subscribe(() => {
    
    }, (error) => {
      this.messageErreur = error.error.message
    }, () => {
      this.messageValidation = "Informations modifiées"
      setTimeout(() => {
        // Redirection au bout de 1,5 secondes
        this.router.navigate(['monCompte']);
      }, 2000);
    });
  }

}
