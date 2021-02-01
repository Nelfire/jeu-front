import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.scss']
})
export class CreationCompteComponent implements OnInit {

  // INITIALISATION
  formCreationCompte:FormGroup;
  messageErreur: string;
  messageValidation: string;
  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm () {
    this.formCreationCompte = this.formBuilder.group({
      pseudo: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  creationCompte() {
    const pseudo = this.formCreationCompte.get('pseudo').value;
    const email = this.formCreationCompte.get('email').value;
    const password = this.formCreationCompte.get('password').value;
    const repeatPassword = this.formCreationCompte.get('repeatPassword').value;
    if(password!=repeatPassword) {
      this.messageErreur = "Les mots de passe ne sont pas identiques. Vérifiez votre saisie."
      this.notification.showError("Les mots de passe ne sont pas identiques. Vérifiez votre saisie.", "Erreur dans la saisie.");

    } else {
      this.authService.creationCompte(pseudo,email,password).subscribe(
        () => {
/*           this.messageErreur = "";
          this.messageValidation = "Compte créé avec succès ☺"; */
        }, (error) => {
          this.messageErreur = error.error.message;
          this.notification.showError(error.error.message, "Erreur dans la saisie.");

        }, () => {
          this.notification.showInfo("", "Compte créé avec succès");
          
        setTimeout(() => {
          // Redirection au bout de 1,5 secondes
          this.router.navigate(['/auth']);
        }, 1000);
        }
      );
    }



  }
}
