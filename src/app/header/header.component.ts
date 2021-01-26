import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Joueur } from '../auth/auth.domains';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { faUser, faStopwatch, faTree } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/models/role';
import 'rxjs/Rx';


import { Observable } from 'rxjs/Observable';
import { JoueurService } from '../service/joueur.service';
import { JoueurInfos } from '../models/joueur-infos';
import { BatimentJoueurService } from '../service/batiment-joueur.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Enumerations
  roleEnum = Role;

  // Icones
  faUser = faUser;
  iconeStopWatch = faStopwatch;
  iconeArbre = faTree;


  // Initialisations
  populationMaximaleJoueur: Number;
  counterSubscription: Subscription;
  secondes = 0;
  utilisateurConnecte: Joueur;
  infosJoueur: JoueurInfos;
/*   pierrePossession: number;
  pierreMaximum: number;
  boisPossession: number;
  boisMaximum: number;
  orPossession: number;
  orMaximum: number;
  nourriturePossession: number;
  nourritureMaximum: number; */


  // Mise en place de l'observable pour récupérer le role du joueur, pour l'affichage des onglets de navigation appropriés
  joueurConnecte: Observable<Joueur>;

  // Constructeur
  constructor(private batimentJoueurService: BatimentJoueurService, private authSrv: AuthService, private router: Router, private joueurService: JoueurService) { }

  ngOnInit() {
    // ** Actualisation chaques secondes ** */
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      (valeur: number) => {
        this.authSrv.verifierAuthentification().subscribe(
          (etatConnexion) => {
            this.utilisateurConnecte = etatConnexion;
            // J'actualise les informations du joueur (Ressources, ...)
            this.joueurService.informationJoueurByEmail().subscribe(
              (value) => {
                this.infosJoueur = value;
/*                 this.pierrePossession = value.pierrePossession;
                this.pierreMaximum = value.pierreMaximum;
                this.boisPossession = value.boisPossession;
                this.boisMaximum = value.boisMaximum;
                this.orPossession = value.orPossession;
                this.orMaximum = value.orMaximum;
                this.nourriturePossession = value.nourriturePossession;
                this.nourritureMaximum = value.nourritureMaximum; */
              }
            );
          }
        );
      }
    );
    // ** timer fin ** */

    this.joueurConnecte = this.authSrv.joueurConnecteObs;

    // On vérifie si l'utilisateur est bien connecté
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => {
        this.utilisateurConnecte = etatConnexion;
      }
    );

    // Récupération populations maximale joueur
    this.batimentJoueurService.populationJoueur().subscribe(
      (value) => {
        this.populationMaximaleJoueur = value;
      }, (error) => {
        console.log(error);
      }
    )
  }

  // Déconnexion
  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

  // Colorisation approche limite ressource (Pierre)
  getColorApprocheLimitePierre() {

      if ((this.infosJoueur.pierrePossession / this.infosJoueur.pierreMaximum) < 0.5) {
        // Vert
        return '#43CF01';
      } else if ((this.infosJoueur.pierrePossession / this.infosJoueur.pierreMaximum) >= 0.5 && (this.infosJoueur.pierrePossession / this.infosJoueur.pierreMaximum) < 0.7) {
        // Jaune
        return '#D2CB04';
      } else if ((this.infosJoueur.pierrePossession / this.infosJoueur.pierreMaximum) >= 0.7 && (this.infosJoueur.pierrePossession / this.infosJoueur.pierreMaximum) < 0.9) {
        // Orange
        return '#FF8B00';
      } else {
        // Rouge
        return '#FF3600';
      }
    

  }

  // Colorisation approche limite ressource (Bois)
  getColorApprocheLimiteBois() {
    if ((this.infosJoueur.boisPossession / this.infosJoueur.boisMaximum) < 0.5) {
      // Vert
      return '#43CF01';
    } else if ((this.infosJoueur.boisPossession / this.infosJoueur.boisMaximum) >= 0.5 && (this.infosJoueur.boisPossession / this.infosJoueur.boisMaximum) < 0.7) {
      // Jaune
      return '#D2CB04';
    } else if ((this.infosJoueur.boisPossession / this.infosJoueur.boisMaximum) >= 0.7 && (this.infosJoueur.boisPossession / this.infosJoueur.boisMaximum) < 0.9) {
      // Orange
      return '#FF8B00';
    } else {
      // Rouge
      return '#FF3600';
    }
  }

  // Colorisation approche limite ressource (Or)
  getColorApprocheLimiteOr() {
    if ((this.infosJoueur.orPossession / this.infosJoueur.orMaximum) < 0.5) {
      // Vert
      return '#43CF01';
    } else if ((this.infosJoueur.orPossession / this.infosJoueur.orMaximum) >= 0.5 && (this.infosJoueur.orPossession / this.infosJoueur.orMaximum) < 0.7) {
      // Jaune
      return '#D2CB04';
    } else if ((this.infosJoueur.orPossession / this.infosJoueur.orMaximum) >= 0.7 && (this.infosJoueur.orPossession / this.infosJoueur.orMaximum) < 0.9) {
      // Orange
      return '#FF8B00';
    } else {
      // Rouge
      return '#FF3600';
    }
  }

  // Colorisation approche limite ressource (Nourriture)
  getColorApprocheLimiteNourriture() {
    if ((this.infosJoueur.nourriturePossession / this.infosJoueur.nourritureMaximum) < 0.5) {
      // Vert
      return '#43CF01';
    } else if ((this.infosJoueur.nourriturePossession / this.infosJoueur.nourritureMaximum) >= 0.5 && (this.infosJoueur.nourriturePossession / this.infosJoueur.nourritureMaximum) < 0.7) {
      // Jaune
      return '#D2CB04';
    } else if ((this.infosJoueur.nourriturePossession / this.infosJoueur.nourritureMaximum) >= 0.7 && (this.infosJoueur.nourriturePossession / this.infosJoueur.nourritureMaximum) < 0.9) {
      // Orange
      return '#FF8B00';
    } else {
      // Rouge
      return '#FF3600';
    }
  }
}
