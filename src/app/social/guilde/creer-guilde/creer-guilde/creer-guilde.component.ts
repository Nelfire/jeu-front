import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuildeService } from 'src/app/service/guilde.service';

@Component({
  selector: 'app-creer-guilde',
  templateUrl: './creer-guilde.component.html',
  styleUrls: ['./creer-guilde.component.scss']
})
export class CreerGuildeComponent implements OnInit {
  // Initialisations 
  messageErreur: string;
  messageValidation: string;
  formCreationGuilde: FormGroup;

  constructor(private formBuilder: FormBuilder, private guildeService: GuildeService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm () {
    this.formCreationGuilde = this.formBuilder.group({
      icone: ['', Validators.required],
      libelle: ['', Validators.required]
    });
  }

  creationGuilde() {
    const icone = this.formCreationGuilde.get('icone').value;
    const libelle = this.formCreationGuilde.get('libelle').value;
    this.guildeService.creerGuilde(icone,libelle).subscribe();
  }
}
