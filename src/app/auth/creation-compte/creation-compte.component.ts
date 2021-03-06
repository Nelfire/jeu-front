import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { BatimentService } from 'src/app/service/batiment.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.scss']
})
export class CreationCompteComponent implements OnInit {

  // INITIALISATION
  formCreationCompte: FormGroup;
  messageErreur: string;
  messageValidation: string;
  secondesRestantes: number = 35;
  counterSubscription: Subscription;
  tempsRestant: String = "00:00:35";
  message: string = ""
  demarrage:boolean = false;

  // CONSTRUCTEUR
  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private batimentService: BatimentService) { }

  // NGONINIT
  ngOnInit(): void {
    this.initForm();

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

  // INITIALISATION FORMULAIRE VIDE
  initForm() {
    this.formCreationCompte = this.formBuilder.group({
      pseudo: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  // BOUTON CREER COMPTE
  creationCompte() {
    const pseudo = this.formCreationCompte.get('pseudo').value;
    const email = this.formCreationCompte.get('email').value;
    const password = this.formCreationCompte.get('password').value;
    const repeatPassword = this.formCreationCompte.get('repeatPassword').value;
    if (password != repeatPassword) {
      this.messageErreur = "Les mots de passe ne sont pas identiques. Vérifiez votre saisie."
      this.notification.showError("Les mots de passe ne sont pas identiques. Vérifiez votre saisie.", "Erreur dans la saisie.");

    } else {
      this.messageValidation = "Patientez un instant, Heroku est en cours de démarrage."
      this.authService.creationCompte(pseudo, email, password).subscribe(
        () => {

        }, (error) => {
          this.messageValidation = "";
          this.messageErreur = error.error.message;
          this.notification.showError(error.error.message, "Erreur dans la saisie.");
        }, () => {
          this.messageErreur = "";
          this.messageValidation = "Compte créé avec succès."
          this.notification.showInfo("", "Compte créé avec succès");
          setTimeout(() => {
            // Redirection au bout de 1 seconde
            this.router.navigate(['/auth']);
          }, 1000);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
