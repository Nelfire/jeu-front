import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

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
    private formBuilder: FormBuilder) { }

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
    } else {
      console.log(pseudo+' / '+email +' / '+password);
      this.authService.creationCompte(pseudo,email,password).subscribe(
        () => {
          this.messageErreur = "";
          this.messageValidation = "Compte créé avec succès ☺";
        }, (error) => {
          this.messageErreur = error.error.message;
        }
      );
    }



  }
}
