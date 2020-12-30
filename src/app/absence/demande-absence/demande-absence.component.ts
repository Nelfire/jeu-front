import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Statut } from 'src/app/models/statut';
import { AbsenceService } from 'src/app/service/absence.service';


@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.scss']
})
export class DemandeAbsenceComponent implements OnInit {

  // Icones
  faCheck = faCheck;
  faTimes = faTimes;

  // Initialisations
  formDemandeAbsence: FormGroup;
  messageErreur = '';
  messageValidation = '';

  // Constructeur
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private AbsenceService: AbsenceService) { }

  ngOnInit(): void {
    this.initialiserFormulaire();
  }

  initialiserFormulaire() {
    this.formDemandeAbsence = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      typeAbsence: ['', Validators.required],
      motifAbsence: ['']
    });
  }

  validerFormulaire() {
    // R�cup�ration des donn�es du formulaire
    const dateDebut = this.formDemandeAbsence.get('dateDebut').value;
    const dateFin = this.formDemandeAbsence.get('dateFin').value;
    const type = this.formDemandeAbsence.get('typeAbsence').value;
    const motif = this.formDemandeAbsence.get('motifAbsence').value;

    // on formate la date du jour au format 'yyyy-MM-dd'
    const dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    // Verifier jour de la semaine date debut
    const jourSaisieDateDebut = formatDate(dateDebut, 'E', 'en-US');
    // Verifier jour de la semaine date fin
    const jourSaisieDateFin = formatDate(dateFin, 'E', 'en-US');

    // -- Gestion des erreurs --
    // 1. Cas jour saisi dans le passé ou aujourd'hui, erreur
    // 2. Cas DateFin < DateDebut
    // 2.0 En cas d'oubli de saisie de type d'absence
    // 2.1 Cas date d�but saisie le WE, erreur
    // 2.1 Cas date fin saisie le WE, erreur
    // 3. Cas congès sans solde, et motif manquant
    // 4. Impossible de saisir une demande qui chevauche une autre sauf si celle-ci est en statut REJETEE

    if (dateDebut <= dateAujourdhui) {
      this.messageErreur = 'ERREUR. UNE DEMANDE NE PEUT ETRE SAISIE SUR UNE DATE ANTERIEURE OU AUJOURDHUI.';
    }
    else if (jourSaisieDateDebut === 'Sat' || jourSaisieDateDebut === 'Sun') {
      this.messageErreur = 'ERREUR. LA DATE DE DEBUT NE PEUT PAS AVOIR LIEU DURANT LE WEEK-END.';
    }
    else if (type === 'null') {
      this.messageErreur = 'IL EST NECESSAIRE DE SELECTIONNER UN TYPE D\'ABSENCE';
    }
    else if (jourSaisieDateFin === 'Sat' || jourSaisieDateFin === 'Sun') {
      this.messageErreur = 'ERREUR. LA DATE DE FIN NE PEUT PAS AVOIR LIEU DURANT LE WEEK-END.';
    }
    else if (dateFin < dateDebut) {
      this.messageErreur = 'ERREUR. LA DATE DE FIN NE PEUT ETRE INFERIEURE A LA DATE DE DEBUT DE CONGES.';
    }
    else if (type === 'CONGES_SANS_SOLDE' && motif === '') {
      this.messageErreur = 'ERREUR. LE MOTIF EST OBLIGATOIRE POUR UNE DEMANDE DE CONGES SANS SOLDE.';
    }
    else {
      console.log(dateDebut, dateFin, motif, type);
      this.AbsenceService.demanderAbsence(dateDebut, dateFin, type, motif, Statut.INITIALE).subscribe(
        () => { },
        (error) => {
          this.messageErreur = error.error.message;
        }, () => {
          this.messageValidation = 'FORMULAIRE VALIDE. REDIRECTION ...';
          this.messageErreur = '';
          setTimeout(() => {
            // Redirection au bout de 2 secondes
            this.router.navigate(['visualisationAbsence']);
          }, 2000);
        }
      );
    }
  }
}

