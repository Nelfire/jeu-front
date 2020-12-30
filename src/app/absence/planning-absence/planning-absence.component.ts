import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AbsenceService } from 'src/app/service/absence.service';
import { AuthService } from 'src/app/service/auth.service';
import { Collegue } from 'src/app/auth/auth.domains';
import { Solde } from 'src/app/models/solde';
import { TypeSolde } from 'src/app/models/type-solde';
import { AbsenceVisualisation } from 'src/app/models/absence-visualisation';
import { Evenement } from 'src/app/models/evenement';
import { Statut } from 'src/app/models/statut';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { JourFermeVisuPlanning } from 'src/app/models/jour-ferme-visu-planning';


@Component({
  selector: 'app-planning-absence',
  templateUrl: './planning-absence.component.html',
  styleUrls: ['./planning-absence.component.scss']
})
export class PlanningAbsenceComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  locale: string = 'fr';
  listeSoldes: Solde[];
  soldeEnum = TypeSolde;
  collegue: Collegue;
  message: string;
  messageErreur = '';
  listeAbsences: AbsenceVisualisation[];
  events: Evenement[] = [];


  loadCalendar: boolean = false;
  loadCalendarFerme: boolean = false;
  statutEnum = Statut;
  listeJourFerme: JourFermeVisuPlanning[] = new Array();


  constructor(private absenceService: AbsenceService, private authService: AuthService, private jourFermeService: JourFermeService) { }

  ngOnInit(): void {

    // Récupération du collegue connecté
    this.authService.collegueConnecteObs.subscribe(
      (col) => {
        this.collegue = col
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );

    // Lister les jours fermés
    this.jourFermeService.listerJourFermePlanning().subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
        this.listeJourFerme.forEach(data => {
          let dateFerme: Date;
          for (dateFerme = new Date(data.date); dateFerme <= new Date(data.date); dateFerme.setDate(new Date(dateFerme).getDate() + 1)) {
            let eventFerme: Evenement = new Evenement(data.commentaire, this.convertDate(dateFerme));
            this.events.push(eventFerme);
          }
        });
        this.loadCalendar = true;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );

    // Afficher les absences
    this.absenceService.listerAbsencesCollegue().subscribe(
      (absences) => {
        this.listeAbsences = absences;
        this.listeAbsences.forEach(value => {
          if (value.statut === this.statutEnum.VALIDEE) {
            let date: Date;
            for (date = new Date(value.dateDebut); date <= new Date(value.dateFin); date.setDate(new Date(date).getDate() + 1)) {
              let event: Evenement = new Evenement(value.type, this.convertDate(date));
              this.events.push(event);
            }
          }
        });
        this.loadCalendarFerme = true;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );

    // Lister solde du collegue
    this.absenceService.listerSoldesCollegue().subscribe(
      (soldes) => {
        this.listeSoldes = soldes;
      },
      (error) => {
        this.messageErreur = error.error.message;
      }
    );

  }

  // Conversion de la date au bon format
  convertDate(inputFormat: Date) {
    const d = new Date(inputFormat);
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
  }

  pad(s: number) { return (s < 10) ? '0' + s : s; }



}
