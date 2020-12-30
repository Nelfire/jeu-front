import { Component, OnInit } from '@angular/core';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { Observable } from 'rxjs';
import { Joueur } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/service/auth.service';
import { faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { JourFermeVisualisation } from 'src/app/models/jour-ferme-visualisation';
import { Statut } from 'src/app/models/statut';

@Component({
  selector: 'app-lister-jour-ferme',
  templateUrl: './lister-jour-ferme.component.html',
  styleUrls: ['./lister-jour-ferme.component.scss']
})
export class ListerJourFermeComponent implements OnInit {

  // Enumerations
  roleEnum = Role;
  statutEnum = Statut;

  // Icones
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;

  // Initialisations
  listeJourFerme: JourFermeVisualisation[] = new Array();
  currentListJourFerme: JourFermeVisualisation[] = new Array();
  utilisateurConnecte: Joueur;
  joueurConnecte: Observable<Joueur>;
  messageErreur = '';
  yearSelect;

  // Message validation modale
  message: string;
  listYears: number[] = new Array();

  // Constructeur
  constructor(private jourFermeService: JourFermeService, private authSrv: AuthService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {

    this.jourFermeService.listerJourFermeParAnnee(new Date().getFullYear()).subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    )
    this.getAllYear();

    this.joueurConnecte = this.authSrv.joueurConnecteObs;

    // On v�rifie si l'utilisateur est bien connect�
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => {
        this.utilisateurConnecte = etatConnexion;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );
  }

  getAllYear() {
    let date: Date = new Date();
    this.yearSelect = date.getFullYear();
    date.setFullYear(date.getFullYear() + 10);

    for (let i = 0; i < 20; i++) {
      this.listYears.push(date.getFullYear());
      date.setFullYear(date.getFullYear() - 1);
    }
  }

  filterYear(year) {
    this.jourFermeService.listerJourFermeParAnnee(year).subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    )
  }

  onUpdate(id: number) {
    this.router.navigate(['/modificationJourFerie']);
  }

  // [DEBUT] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  onDelete(id: number) {
    this.jourFermeService.suppressionJourFerme(id).subscribe(
      data => this.refresh(data));
  }
  // [FIN] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  open(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.onDelete(id);
    });
  }

  refresh(data) {
    this.jourFermeService.listerJourFermeParAnnee(new Date().getFullYear()).subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    )
  }

}
