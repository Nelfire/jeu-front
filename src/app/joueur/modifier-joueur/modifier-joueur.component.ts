import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from 'src/app/auth/auth.domains';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { JoueurService } from 'src/app/service/joueur.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@angular/compiler/src/core';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-modifier-joueur',
  templateUrl: './modifier-joueur.component.html',
  styleUrls: ['./modifier-joueur.component.scss']
})
export class ModifierJoueurComponent implements OnInit {

  // Icones
  faCheck = faCheck;
  faTimes = faTimes;

  // INITIALISATIONS
  formModificationJoueur: FormGroup;
  joueur: JoueurInfos;
  messageValidation: string;
  messageErreur: string;
  email: string;

  // CONSTRUCTEUR
  constructor(private activatedRoute: ActivatedRoute,
    private joueurService: JoueurService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NotificationService) { }

  // NGONINIT
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

  // INITIALISATIONS DU FORMULAIRE AVEC DONNEES
  initForm() {
    this.formModificationJoueur = this.formBuilder.group({
      pseudo: [this.joueur.pseudo, Validators.required],
      icone: [this.joueur.icone, Validators.required],
      email: [this.joueur.email, Validators.required],
      descriptif: [this.joueur.descriptif, Validators.required]
    });
  }

  // BOUTON VALIDER
  validerFormulaire() {

    const icone = this.formModificationJoueur.get("icone").value;
    /* const email = this.formModificationJoueur.get("email").value; */
    const descriptif = this.formModificationJoueur.get("descriptif").value;

    this.joueurService.modifierInformationsJoueur(icone, descriptif).subscribe(() => {

    }, (error) => {
      this.notification.showError(error.error.message, "Informations modifiées.");
    }, () => {
      this.notification.showSuccess("", "Informations modifiées.");
      setTimeout(() => {
        // Redirection au bout de 1,5 secondes
        this.router.navigate(['/detailJoueur/' + this.joueur.id]);
      }, 1500);
    });
  }

}
