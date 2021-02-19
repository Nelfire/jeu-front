import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { JoueurService } from 'src/app/service/joueur.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ListeAmisService } from 'src/app/service/social/liste-amis.service';

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.scss']
})
export class DetailCompteComponent implements OnInit {


  // INITILISATIONS
  joueur: JoueurInfos;
  joueurConnecte: JoueurInfos;
  messageErreur: string;
  dejaAmis: boolean;
  constructor(private joueurService: JoueurService, 
    private routerLinkActive: ActivatedRoute,
    private listeAmisService: ListeAmisService,
    private notification: NotificationService) { }

  ngOnInit(): void {

    // Données du Joueur connecté
    this.joueurService.informationJoueurByEmail().subscribe(
      (donnees) => {
        this.joueurConnecte = donnees;
      }, (error) => {
        this.messageErreur = "Erreur dans le traitement : " + error;
      }
    );

    this.traitement();

  }

  traitement() {
        // Rï¿½cupï¿½ration informations du collegue connectï¿½ (email) pour la vï¿½rification suivante.
        this.joueurService.informationJoueurById(this.routerLinkActive.snapshot.params['id']).subscribe(
          (donnees) => {
            this.joueur = donnees;
    
    
            this.listeAmisService.lister().subscribe(
              (value) => {
                value.listeDAmis.forEach(element => {
                  if(element == donnees.id) {
                    this.dejaAmis = true;
                  }
                });
              }
            )
          }, (error) => {
            this.messageErreur = "Erreur dans le traitement : " + error;
          }, () => {
            // Tout est ok
          }
        );
  }

  ajouterAmi(id:number) {
    console.log("Ajouter ami !"+id)
    this.listeAmisService.ajouterAmi(id).subscribe(
      () => {
        this.notification.showSuccess("Vous avez un nouvel ami !", "Ami ajouté.");
        this.traitement();

      }
    );
  }

  dejaAmi() {
    this.notification.showWarning("Vous semblez déjà super ami avec cette personne ! ☺", "Déjà ami.");
  }


}
