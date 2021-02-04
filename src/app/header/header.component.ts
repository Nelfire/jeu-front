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
import { GenerationRessourcesService } from '../service/generation-ressources.service';
import { InformationRessourcesJoueur } from '../models/informationRessourcesJoueur';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';


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
  informationRessourcesJoueur: InformationRessourcesJoueur;
  subscribtions: Subscription[] = [];
  flag: boolean;

  // Mise en place de l'observable pour récupérer le role du joueur, pour l'affichage des onglets de navigation appropriés
  joueurConnecte: Observable<Joueur>;

  // Constructeur
  constructor(private batimentJoueurService: BatimentJoueurService,
    private authSrv: AuthService,
    private router: Router,
    private joueurService: JoueurService,
    private generationRessourcesService: GenerationRessourcesService) { }

  ngOnInit() {

    this.joueurConnecte = this.authSrv.joueurConnecteObs;

    this.recuperationRessources();
    if (this.generationRessourcesService.subsVar == undefined) {
      
      this.generationRessourcesService.subsVar = this.generationRessourcesService.
        invokeFirstComponentFunction.subscribe(
          (name: string) => {
            console.log("Ligne 64 Header.component.ts");
            this.recuperationRessources();
          });
    }

    // Informations du joueur
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
    //this.actualisationRessourcesChaquesSecondes();
  }


  // Réel appel aux ressources / actualisation
  recuperationRessources() {
    // DESTRUCTION DES SOUSCRIPTIONS (Utile ici ?)
    this.ngOnDestroy();
    this.flag = false;
    console.log("-----------")
    console.log("FLAG --> " + this.flag)

    // J'APPELLE LES DONNEES RESSOURCE, POUR METTRE A JOUR
    this.joueurService.informationRessourcesJoueur().subscribe(
      (value) => {
        this.informationRessourcesJoueur = value;
        console.log("-- RECUPERATION RESSOURCES QUE POSSEDE LE JOUEUR -- ");
        console.log("INFORMATIONS RESSOURCES PIERRE : " + this.informationRessourcesJoueur.pierrePossession);
        console.log("INFORMATIONS RESSOURCES BOIS : " + this.informationRessourcesJoueur.boisPossession);
        console.log("INFORMATIONS RESSOURCES OR : " + this.informationRessourcesJoueur.orPossession);
        console.log("INFORMATIONS RESSOURCES NOURRITURE : " + this.informationRessourcesJoueur.nourriturePossession);
        this.flag = true;
        console.log("FLAG --> " + this.flag)
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
        console.log("-refresh- Pierre possession:" + this.informationRessourcesJoueur.pierrePossession);
        this.informationRessourcesJoueur.pierrePossession = (this.informationRessourcesJoueur.pierrePossession + this.informationRessourcesJoueur.apportPierreSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockagePierre ? this.informationRessourcesJoueur.quantiteMaximaleStockagePierre : this.informationRessourcesJoueur.pierrePossession + this.informationRessourcesJoueur.apportPierreSeconde;
        this.informationRessourcesJoueur.boisPossession = (this.informationRessourcesJoueur.boisPossession + this.informationRessourcesJoueur.apportBoisSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockageBois ? this.informationRessourcesJoueur.quantiteMaximaleStockageBois : this.informationRessourcesJoueur.boisPossession + this.informationRessourcesJoueur.apportBoisSeconde;
        this.informationRessourcesJoueur.orPossession = (this.informationRessourcesJoueur.orPossession + this.informationRessourcesJoueur.apportOrSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockageOr ? this.informationRessourcesJoueur.quantiteMaximaleStockageOr : this.informationRessourcesJoueur.orPossession + this.informationRessourcesJoueur.apportOrSeconde;
        this.informationRessourcesJoueur.nourriturePossession = (this.informationRessourcesJoueur.nourriturePossession + this.informationRessourcesJoueur.apportNourritureSeconde) > this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture ? this.informationRessourcesJoueur.quantiteMaximaleStockageNourriture : this.informationRessourcesJoueur.nourriturePossession + this.informationRessourcesJoueur.apportNourritureSeconde;

      }
    );
    this.subscribtions.push(this.counterSubscription);
  }



  ngOnDestroy() {
    if (this.subscribtions) {
      this.subscribtions.forEach(element => {
        element.unsubscribe();
        console.log("Destruction !");
      });
    }
  }
































  // Déconnexion
  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
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
}