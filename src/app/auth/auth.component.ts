import { Component, OnInit } from '@angular/core';
import {Collegue} from './auth.domains';
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
  collegue: Collegue = new Collegue({});
  err: boolean;

  // Constructeur
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
  }

  connecter() {
    this.authSrv.connecter(this.collegue.email, this.collegue.motDePasse)
      .subscribe(
        // en cas de succès, redirection vers la page /tech
        col => this.router.navigate(['/accueil']),

        // en cas d'erreur, affichage d'un message d'erreur
        err => this.err = true
      );
  }

}
