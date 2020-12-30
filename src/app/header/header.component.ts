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
  
  infosJoueur: JoueurInfos;
  // Initialisations
  counterSubscription: Subscription;
  secondes = 0;
  utilisateurConnecte: Joueur;

  // Mise en place de l'observable pour r�cup�rer le role du joueur, pour l'affichage des onglets de navigation appropri�s
  joueurConnecte: Observable<Joueur>;

  constructor(private authSrv: AuthService, private router: Router, private joueurService: JoueurService) { }

  ngOnInit() {


    // ** Actualisation chaques secondes ** */
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      (valeur: number) => {
        this.authSrv.verifierAuthentification().subscribe(
          (etatConnexion) => {
            this.utilisateurConnecte = etatConnexion;
            // J'actualise les informations du joueur (Ressources, ...)
            this.joueurService.informationJoueurByEmail(etatConnexion.email).subscribe(
              (value) => {
                this.infosJoueur = value;
              }
            )
          }
        );
      }
    );
    // ** timer fin ** */

    this.joueurConnecte = this.authSrv.joueurConnecteObs;

    // On v�rifie si l'utilisateur est bien connect�
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => {
        this.utilisateurConnecte = etatConnexion;
      }
    );
  }

  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}
