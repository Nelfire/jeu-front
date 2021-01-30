import { Component, OnInit } from '@angular/core';
import {Joueur} from './auth.domains';
import {Router} from '@angular/router';
import { AuthService } from '../service/auth.service';

/**
 * Formulaire d'authentification.
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // Initisalisations
  joueur: Joueur = new Joueur({});
  messageErreur: boolean;

  // Constructeur
  constructor(private authSrv: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }

  connecter() {
    this.authSrv.connecter(this.joueur.email, this.joueur.motDePasse)
      .subscribe(
        // en cas de succès, redirection vers la page d'accueil
        (col) => {
          this.router.navigate(['/accueil'])
        }, (messageErreur) => {
          // en cas d'erreur, affichage d'un message d'erreur
          this.messageErreur = true
        }
      );
  }

}
