import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { formatDate } from '@angular/common';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-creation-jour-ferme',
  templateUrl: './creation-jour-ferme.component.html',
  styleUrls: ['./creation-jour-ferme.component.scss']
})
export class CreationJourFermeComponent implements OnInit {

  // Icones
  faCheck = faCheck;
  faTimes = faTimes;

  // Initialisations
  formCreationJourFerme: FormGroup;
  messageErreur = '';
  messageValidation = '';

  // Constructeur
  constructor(private router: Router, private formBuilder: FormBuilder, private jourFermeService: JourFermeService) { }

  ngOnInit(): void {
    this.initialiserFormulaire();
  }

  initialiserFormulaire() {
    this.formCreationJourFerme = this.formBuilder.group({
      dateJourFerme: ['', Validators.required],
      typeJourFerme: ['', Validators.required],
      commentaireJourFerme: ['']
    });
  }

  validerFormulaire() {

    // R�cup�ration des donn�es du formulaire
    const dateJourFerme = this.formCreationJourFerme.get('dateJourFerme').value;
    const typeJourFerme = this.formCreationJourFerme.get('typeJourFerme').value;
    const commentaireJourFerme = this.formCreationJourFerme.get('commentaireJourFerme').value;

    // on formate la date du jour au format 'yyyy-MM-dd'
    const dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    // Verifier jour de la semaine
    const jourSaisie = formatDate(dateJourFerme, 'E', 'en-US');

    // V�rification du jour saisi
    // Cas 1 , jour saisi est dans le pass�, erreur
    // Cas 2 , saisie RTT le WE, erreur
    // Cas 2.1, cas oubli saisie de type jour ferme
    // Cas 3 , cas JOUR FERIE et commentaire manquant
    // Cas 4 , jour saisi est dans le futur, ok

    if (dateJourFerme < dateAujourdhui) {
      this.messageErreur = 'ERREUR. SAISIE DANS LE PASSE IMPOSSIBLE.';
    }
    else if (typeJourFerme === 'RTT_EMPLOYEUR' && (jourSaisie === 'Sat' || jourSaisie === 'Sun')) {
      this.messageErreur = 'ERREUR. IMPOSSIBLE DE SAISIR UN RTT LE WEEK-END.';
    }
    else if (typeJourFerme === 'null') {
      this.messageErreur = 'IL EST NECESSAIRE DE SELECTIONNER UN TYPE DE JOUR FERME';
    }
    else if (typeJourFerme === 'JOURS_FERIES' && commentaireJourFerme === '') {
      this.messageErreur = 'ERREUR. LE COMMENTAIRE EST OBLIGATOIRE POUR LES JOURS FERIES.';
    }
    else {
      this.jourFermeService.ajouterJourFerme(dateJourFerme, typeJourFerme, commentaireJourFerme).subscribe(
        () => { },
        (error) => {
          this.messageErreur = error.error.message;
        }, () => {
          this.messageValidation = 'FORMULAIRE VALIDE. REDIRECTION ...';
          this.messageErreur = '';
          setTimeout(() => {
            // Redirection au bout de 2 secondes
            this.router.navigate(['listerJourFerme']);
          }, 2000);
        }
      );
    }
  }
}
