import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { JourFermeVisualisation } from 'src/app/models/jour-ferme-visualisation';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modification-jour-ferme',
  templateUrl: './modification-jour-ferme.component.html',
  styleUrls: ['./modification-jour-ferme.component.scss']
})
export class ModificationJourFermeComponent implements OnInit {

  // Icones
  faCheck = faCheck;
  faTimes = faTimes;

  // Initialisations
  formModificationJourFerme: FormGroup;

  messageErreur = '';
  messageValidation = '';
  id: number;
  jourFerme: JourFermeVisualisation;

  // Constructeur
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private jourFermeService: JourFermeService,
    private routerLinkActive: ActivatedRoute) { }

  ngOnInit(): void {
    // Initialisation du formulaire vide.
    this.formModificationJourFerme = this.formBuilder.group({
      dateJourFerme: ['', Validators.required],
      typeJourFerme: ['', Validators.required],
      commentaireJourFerme: ['']
    });

    // Snapshot pour récupérer l'id passé via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    // Subscription à l'observable
    this.jourFermeService.getJourFermeParId(this.id).subscribe(
      (jour) => {
        this.jourFerme = jour;
        this.initialiserFormulaire();
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    )

  }

  initialiserFormulaire() {
    this.formModificationJourFerme = this.formBuilder.group({
      dateJourFerme: [this.jourFerme.date, Validators.required],
      typeJourFerme: [this.jourFerme.type, Validators.required],
      commentaireJourFerme: [this.jourFerme.commentaire]
    });
  }

  validerFormulaire() {

    // Rï¿½cupï¿½ration des donnï¿½es du formulaire
    const dateJourFerme = this.formModificationJourFerme.get('dateJourFerme').value;
    const typeJourFerme = this.formModificationJourFerme.get('typeJourFerme').value;
    const commentaireJourFerme = this.formModificationJourFerme.get('commentaireJourFerme').value;

    // on formate la date du jour au format 'yyyy-MM-dd'
    const dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    // Verifier jour de la semaine
    const jourSaisie = formatDate(dateJourFerme, 'E', 'en-US');

    // Vï¿½rification du jour saisi
    // Cas 1 , jour saisi est dans le passï¿½, erreur
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
      this.jourFermeService.modifierJourFerme(this.id, dateJourFerme, typeJourFerme, commentaireJourFerme).subscribe(
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
