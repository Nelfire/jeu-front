import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuildeService } from 'src/app/service/guilde.service';

@Component({
  selector: 'app-creer-guilde',
  templateUrl: './creer-guilde.component.html',
  styleUrls: ['./creer-guilde.component.scss']
})
export class CreerGuildeComponent implements OnInit {

  // INITIALISATIONS 
  messageErreur: string;
  messageValidation: string;
  formCreationGuilde: FormGroup;

  // CONSTRUCTEUR
  constructor(private formBuilder: FormBuilder, private guildeService: GuildeService, private router: Router) { }

  // NGONINIT
  ngOnInit(): void {
    this.initForm();
  }

  // INITIALISATION DU FORMULAIRE VIDE
  initForm() {
    this.formCreationGuilde = this.formBuilder.group({
      icone: ['', Validators.required],
      libelle: ['', Validators.required]
    });
  }

  // BOUTON CREER GUILDE
  creationGuilde() {
    const icone = this.formCreationGuilde.get('icone').value;
    const libelle = this.formCreationGuilde.get('libelle').value;
    this.guildeService.creerGuilde(icone, libelle).subscribe(
      () => {
      }, (error) => {
        this.messageErreur = error.error.message;
      }, () => {
        this.messageValidation = "Guilde créée";
        setTimeout(() => {
          // Redirection au bout de 1,5 secondes
          this.router.navigate(['listeGuildes']);
        }, 1500);
      }
    );
  }
}
