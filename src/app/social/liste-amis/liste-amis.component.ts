import { Component, OnInit } from '@angular/core';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { JoueurService } from 'src/app/service/joueur.service';
import { ListeAmisService } from 'src/app/service/social/liste-amis.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-liste-amis',
  templateUrl: './liste-amis.component.html',
  styleUrls: ['./liste-amis.component.scss']
})
export class ListeAmisComponent implements OnInit {

  faTrash = faTrash;
  listeAmis: JoueurInfos[] = [];
  listeVide:boolean = true;
  messageErreur: string;
  constructor(private joueurService: JoueurService,
    private listeAmisService: ListeAmisService,
    private modalService: NgbModal,
    private notification: NotificationService) { }

  ngOnInit(): void {
    // LISTER LES AMIS DU JOUEUR
    this.listerAmis();
  }

  listerAmis() {
    this.listeVide = true;
    this.listeAmis = [];
    this.listeAmisService.lister().subscribe(
      (value) => {
        value.listeDAmis.forEach(element => {
          this.listeVide = false;

          this.joueurService.informationJoueurById(element).subscribe(
            (donnees) => {
              this.listeAmis.push(donnees);
            }
          );
        });
      }
    );
  }



  // [DEBUT] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  onDelete(id: number) {
    this.listeAmisService.retirerAmi(id).subscribe(() => {
      this.listerAmis();          
      this.notification.showSuccess("Ami retiré avec succès.", "Amitié brisée.");
    }, (error) => {
      this.notification.showError(error.error.message, "Erreur.");

    } );
    
  }
  // [FIN] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  open(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.onDelete(id);
    });
  }


  refresh(data) {
    this.listerAmis();
  }

}
