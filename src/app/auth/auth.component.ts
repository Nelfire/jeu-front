import { Component, OnInit } from '@angular/core';
import { Joueur } from './auth.domains';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, Subscription } from 'rxjs';
import { BatimentService } from '../service/batiment.service';

/**
 * Formulaire d'authentification.
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // INITIALISATIONS
  joueur: Joueur = new Joueur({});
  messageErreur: boolean;
  secondesRestantes: number = 35;
  counterSubscription: Subscription;
  tempsRestant: String = "00:00:35";
  message: string = ""
  demarrage:boolean = false;

  // CONSTRUCTEUR
  constructor(private authSrv: AuthService,
    private router: Router,
    private batimentService: BatimentService) { }

  // NGONINIT
  ngOnInit() {
    // MESSAGE HEROKU
    this.message = "Heroku en cours de démarrage";

    // FAKE REQUETE POUR DEMARRER HEROKU
    this.batimentService.detailsBatiment(1).subscribe(
      () => {
        // Héroku démarré, compteur retiré
        this.message = "Heroku démarré";
        this.demarrage = true;
        this.secondesRestantes = 0;
        this.ngOnDestroy();
      }
    );

    // TIMER
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      (valeur: number) => {
        // EN CAS DE FIN DE TIMER, DESTRUCTION
        if (this.secondesRestantes < 1) {
          this.ngOnDestroy();
          if(this.demarrage == false) {
            this.message = "Oh, Heroku semble avoir du mal à démarrer... Patientez un instant ...";
          }
        }

        // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
        this.secondesRestantes--;
        var date = new Date(null);
        date.setSeconds(this.secondesRestantes);
        this.tempsRestant = date.toISOString().substr(11, 8);
      }
    );
  }

  // BOUTON CONNEXION
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

  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

}
