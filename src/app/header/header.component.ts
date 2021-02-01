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
import { InformationRessourcesJoueur } from '../models/informationRessourcesJoueur';


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
  counterSubscription: Subscription;
/*   secondes = 0; */
/*   utilisateurConnecte: Joueur; */
  infosJoueur: JoueurInfos;
  // Récupération de :

  // Informations Ressource joueur
  informationRessourcesJoueur: InformationRessourcesJoueur;





  // Mise en place de l'observable pour récupérer le role du joueur, pour l'affichage des onglets de navigation appropriés
  joueurConnecte: Observable<Joueur>;

  // Constructeur
  constructor(private authSrv: AuthService,
    private router: Router,
    private joueurService: JoueurService) { }

  ngOnInit() {




    // RECUPERATION INFORMATIONS RESSOURCE 
    this.joueurService.informationRessourcesJoueur().subscribe(
      (value) => {
        this.informationRessourcesJoueur = value;
      }
    );

    // ** Actualisation chaques secondes ** */
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      (valeur: number) => {
        this.informationRessourcesJoueur.pierrePossession = this.informationRessourcesJoueur.pierrePossession+this.informationRessourcesJoueur.apportPierreSeconde;
        this.informationRessourcesJoueur.boisPossession = this.informationRessourcesJoueur.boisPossession+this.informationRessourcesJoueur.apportBoisSeconde;
        this.informationRessourcesJoueur.orPossession = this.informationRessourcesJoueur.orPossession+this.informationRessourcesJoueur.apportOrSeconde;
        this.informationRessourcesJoueur.nourriturePossession = this.informationRessourcesJoueur.nourriturePossession+this.informationRessourcesJoueur.apportNourritureSeconde;
      }
    );
    // ** timer fin ** */
/* 
    this.joueurConnecte = this.authSrv.joueurConnecteObs;

    // On vérifie si l'utilisateur est bien connecté
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => {
        this.utilisateurConnecte = etatConnexion;
      }
    ); */


    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );

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

  /* // Colorisation approche limite ressource (Pierre)
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
  } */
}
