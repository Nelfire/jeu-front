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
  joueurInspecte: JoueurInfos;
  joueurConnecte: JoueurInfos;
  messageErreur: string;
  dejaAmis: boolean;
  expRestant: number;
  seuil: number;
  idJoueurInspecte: number;
  idJoueurConnecte: number;

  // CONSTRUCTEUR
  constructor(private joueurService: JoueurService,
    private routerLinkActive: ActivatedRoute,
    private listeAmisService: ListeAmisService,
    private notification: NotificationService) { }

  // NGONINIT
  ngOnInit(): void {

    this.idJoueurInspecte = this.routerLinkActive.snapshot.params['id'];
    // Données du Joueur inespecté
    this.joueurService.informationJoueurById(this.routerLinkActive.snapshot.params['id']).subscribe(
      (donneesJoueurInspecte) => {
        this.joueurInspecte = donneesJoueurInspecte;
        this.determinerExpProchainNiveau(donneesJoueurInspecte.experience);
        this.traitement();
      }, (error) => {
        this.messageErreur = "Erreur dans le traitement : " + error;
      }
    );

    
    // Données du Joueur connecté
    this.joueurService.informationJoueurByEmail().subscribe(
      (donnees) => {
        this.joueurConnecte = donnees;
        this.idJoueurConnecte = donnees.id;
      }, (error) => {
        this.messageErreur = "Erreur dans le traitement : " + error;
      }
    );
  }

  traitement() {
    this.joueurService.informationJoueurById(this.routerLinkActive.snapshot.params['id']).subscribe(
      (donnees) => {
        this.joueur = donnees;
        this.listeAmisService.lister().subscribe(
          (value) => {
            value.listeDAmis.forEach(element => {
              if (element == donnees.id) {
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

  // BOUTON AJOUTER AMI
  ajouterAmi(id: number) {
    this.listeAmisService.ajouterAmi(id).subscribe(
      () => {
        this.notification.showSuccess("Vous avez un nouvel ami !", "Ami ajouté.");
        this.traitement();

      }
    );
  }

  // BOUTON DEJA AMI
  dejaAmi() {
    this.notification.showWarning("Vous semblez déjà super ami avec cette personne ! ☺", "Déjà ami.");
  }

  getExperienceJoueur() {
    // Temps du niveau suivantle
    let pourcentageRestant;
    pourcentageRestant = (this.expRestant * 100) / this.seuil;
    return pourcentageRestant + '%';
  }

  determinerExpProchainNiveau(experience: number) {
    var fin = false;
    var seuil = 5000;
    while (fin != true) {
      if (experience - seuil > 0) {
        experience = experience - seuil;
        seuil = seuil * 2;
      } else {
        fin = true;
      }
    }
    this.expRestant = experience;
    this.seuil = seuil;
  }


}
