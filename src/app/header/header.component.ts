import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { GenerationRessourcesService } from '../service/generation-ressources.service';
import { InformationRessourcesJoueur } from '../models/informationRessourcesJoueur';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import * as introJs from 'intro.js/intro.js';
import { TutorielService } from '../service/tutoriel.service';


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

  // INITIALISATIONS
  intro = introJs();
  populationMaximaleJoueur: Number;
  counterSubscription: Subscription;
  secondes = 0;
  utilisateurConnecte: Joueur;
  infosJoueur: JoueurInfos;
  informationRessourcesJoueur: InformationRessourcesJoueur;
  subscribtions: Subscription[] = [];
  flag: boolean;

  // Mise en place de l'observable pour récupérer le role du joueur, pour l'affichage des onglets de navigation appropriés
  joueurConnecte: Observable<Joueur>;

  // CONSTRUCTEUR
  constructor(private batimentJoueurService: BatimentJoueurService,
    private authSrv: AuthService,
    private router: Router,
    private joueurService: JoueurService,
    private generationRessourcesService: GenerationRessourcesService,
    private routerLinkActive: ActivatedRoute,
    private tutorielService: TutorielService) { }

  // NGONINIT
  ngOnInit() {

    this.joueurConnecte = this.authSrv.joueurConnecteObs;

    this.recuperationRessources();
    if (this.generationRessourcesService.subsVar == undefined) {

      this.generationRessourcesService.subsVar = this.generationRessourcesService.
        invokeFirstComponentFunction.subscribe(
          (name: string) => {
            this.recuperationRessources();
          });
    }

    // Informations du joueur
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
  }

  // Réel appel aux ressources / actualisation
  recuperationRessources() {
    // DESTRUCTION DES SOUSCRIPTIONS (Utile ici ?)
    this.ngOnDestroy();
    this.flag = false;

    // J'APPELLE LES DONNEES RESSOURCE, POUR METTRE A JOUR
    this.joueurService.informationRessourcesJoueur().subscribe(
      (value) => {
        this.informationRessourcesJoueur = value;
        this.flag = true;
      }
    );

    this.actualisationRessourcesChaquesSecondes();
  }

  actualisationRessourcesChaquesSecondes() {
    this.ngOnDestroy();
    // Chaques secondes, simulation apport ressources
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      () => {
        this.informationRessourcesJoueur.pierrePossession = (this.informationRessourcesJoueur.pierrePossession + this.informationRessourcesJoueur.apportPierreSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockagePierre ? this.informationRessourcesJoueur.quantiteMaximaleStockagePierre : this.informationRessourcesJoueur.pierrePossession + this.informationRessourcesJoueur.apportPierreSeconde;
        this.informationRessourcesJoueur.boisPossession = (this.informationRessourcesJoueur.boisPossession + this.informationRessourcesJoueur.apportBoisSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockageBois ? this.informationRessourcesJoueur.quantiteMaximaleStockageBois : this.informationRessourcesJoueur.boisPossession + this.informationRessourcesJoueur.apportBoisSeconde;
        this.informationRessourcesJoueur.orPossession = (this.informationRessourcesJoueur.orPossession + this.informationRessourcesJoueur.apportOrSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockageOr ? this.informationRessourcesJoueur.quantiteMaximaleStockageOr : this.informationRessourcesJoueur.orPossession + this.informationRessourcesJoueur.apportOrSeconde;
        this.informationRessourcesJoueur.nourriturePossession = (this.informationRessourcesJoueur.nourriturePossession + this.informationRessourcesJoueur.apportNourritureSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture ? this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture : this.informationRessourcesJoueur.nourriturePossession + this.informationRessourcesJoueur.apportNourritureSeconde;

      }
    );
    this.subscribtions.push(this.counterSubscription);
  }

  // Déconnexion
  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => window.location.href = window.location.protocol + 'auth')
  }

  // Colorisation approche limite ressource (Pierre)
  getColorApprocheLimitePierre() {

    if ((this.informationRessourcesJoueur.pierrePossession / this.informationRessourcesJoueur.quantiteMaximaleStockagePierre) < 0.5) {
      // Vert
      return '#43CF01';
    } else if ((this.informationRessourcesJoueur.pierrePossession / this.informationRessourcesJoueur.quantiteMaximaleStockagePierre) >= 0.5 && (this.informationRessourcesJoueur.pierrePossession / this.informationRessourcesJoueur.quantiteMaximaleStockagePierre) < 0.7) {
      // Jaune
      return '#D2CB04';
    } else if ((this.informationRessourcesJoueur.pierrePossession / this.informationRessourcesJoueur.quantiteMaximaleStockagePierre) >= 0.7 && (this.informationRessourcesJoueur.pierrePossession / this.informationRessourcesJoueur.quantiteMaximaleStockagePierre) < 0.9) {
      // Orange
      return '#FF8B00';
    } else {
      // Rouge
      return '#FF3600';
    }
  }

  // Colorisation approche limite ressource (Bois)
  getColorApprocheLimiteBois() {
    if ((this.informationRessourcesJoueur.boisPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageBois) < 0.5) {
      // Vert
      return '#43CF01';
    } else if ((this.informationRessourcesJoueur.boisPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageBois) >= 0.5 && (this.informationRessourcesJoueur.boisPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageBois) < 0.7) {
      // Jaune
      return '#D2CB04';
    } else if ((this.informationRessourcesJoueur.boisPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageBois) >= 0.7 && (this.informationRessourcesJoueur.boisPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageBois) < 0.9) {
      // Orange
      return '#FF8B00';
    } else {
      // Rouge
      return '#FF3600';
    }
  }

  // Colorisation approche limite ressource (Or)
  getColorApprocheLimiteOr() {
    if ((this.informationRessourcesJoueur.orPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageOr) < 0.5) {
      // Vert
      return '#43CF01';
    } else if ((this.informationRessourcesJoueur.orPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageOr) >= 0.5 && (this.informationRessourcesJoueur.orPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageOr) < 0.7) {
      // Jaune
      return '#D2CB04';
    } else if ((this.informationRessourcesJoueur.orPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageOr) >= 0.7 && (this.informationRessourcesJoueur.orPossession / this.informationRessourcesJoueur.quantiteMaximaleStockageOr) < 0.9) {
      // Orange
      return '#FF8B00';
    } else {
      // Rouge
      return '#FF3600';
    }
  }

  // Colorisation approche limite ressource (Nourriture)
  getColorApprocheLimiteNourriture() {
    if ((this.informationRessourcesJoueur.nourriturePossession / this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture) < 0.5) {
      // Vert
      return '#43CF01';
    } else if ((this.informationRessourcesJoueur.nourriturePossession / this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture) >= 0.5 && (this.informationRessourcesJoueur.nourriturePossession / this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture) < 0.7) {
      // Jaune
      return '#D2CB04';
    } else if ((this.informationRessourcesJoueur.nourriturePossession / this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture) >= 0.7 && (this.informationRessourcesJoueur.nourriturePossession / this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture) < 0.9) {
      // Orange
      return '#FF8B00';
    } else {
      // Rouge
      return '#FF3600';
    }
  }

  // Check routing Tutoriel
  lancementTutoriel() {
    // Tutoriel Accueil
    if (this.router.url == "/accueil") {
      this.tutorielService.tutorielAccueil();
    }
    // Tutoriel Campement
    if (this.router.url == "/campement") {
      this.tutorielService.tutorielCampement();
    }
    // Tutoriel Armée
    if (this.router.url == "/armee") {
      this.tutorielService.tutorielArmee();
    }
    // Tutoriel Défense
    if (this.router.url == "/defense") {
      this.tutorielService.tutorielDefense();
    }
    // Tutoriel Boutique
    if (this.router.url == "/boutique") {
      this.tutorielService.tutorielBoutique();
    }

    // Tutoriel Centre de récolte 
    if (this.router.url == "/centreRecolte") {
      this.tutorielService.tutorielCentreRecolte();
    }

    // Tutoriel classement des joueurs
    if (this.router.url == "/classement-joueurs") {
      this.tutorielService.tutorielClassementJoueur();
    }

    // Tutoriel expéditions
    if (this.router.url == "/expedition") {
      this.tutorielService.tutorielExpedition();
    }

    // Tutoriel marché
    if (this.router.url == "/marche") {
      this.tutorielService.tutorielMarche();
    }

    // Tutoriel mode campagne
    if (this.router.url == "/campagne") {
      this.tutorielService.tutorielCampagne();
    }

    for (var i: number = 0; i < 25; i++) {
      // Tutoriel détail unité
      if (this.router.url == "/unitee/detail-unitee/" + i) {
        this.tutorielService.tutorielDetailUnite();
      }
      // Tutoriel détail défense
      if (this.router.url == "/defense/detail-defense/" + i) {
        this.tutorielService.tutorielDetailDefense();
      }

      // Tutoriel détail bâtiment
      if (this.router.url == "/batiment/detail-batiment/" + i) {
        this.tutorielService.tutorielDetailBatiment();
      }
    }

    for (var j: number = 0; j < 151; j++) {
      // Tutoriel détail campagne
      if (this.router.url == "/campagne/detail-campagne/" + j) {
        this.tutorielService.tutorielDetailCampagne();
      }
    }

    for (var i: number = 0; i < 500; i++) {
      // Tutoriel détail expédition
      if (this.router.url == "/expedition/detail-expedition/" + i) {
        this.tutorielService.tutorielDetailExpedition();
      }

    }
  }

  ngOnDestroy() {
    if (this.subscribtions) {
      this.subscribtions.forEach(element => {
        element.unsubscribe();
      });
    }
  }
}