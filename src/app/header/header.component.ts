import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Collegue } from '../auth/auth.domains';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { faUser, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/models/role';
import 'rxjs/Rx';


import { Observable } from 'rxjs/Observable';


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

  // Initialisations
  counterSubscription: Subscription;
  secondes = 0;
  utilisateurConnecte: Collegue;

  // Mise en place de l'observable pour récupérer le role du collègue, pour l'affichage des onglets de navigation appropriés
  collegueConnecte: Observable<Collegue>;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
    // ** timer debut ** */
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      (valeur: number) => {
        this.secondes = valeur;
      }
    );
    // ** timer fin ** */

    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    // On vérifie si l'utilisateur est bien connecté
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
