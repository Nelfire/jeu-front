import { Component, OnInit } from '@angular/core';
import {MessageService} from '../service/message.service';
import {Message} from '../models/message';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/Rx';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Collegue} from "../auth/auth.domains";
import {AuthService} from "../service/auth.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  listeMessages: Message[];
  message: string;
  counterSubscription: Subscription;

  // Initialisations
  formAjouterMessage: FormGroup;
  collegue: Collegue;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.initialiserFormulaire();

    this.authService.collegueConnecteObs.subscribe(
      (col) => {
        this.collegue = col;
      }, (error) => {
        this.message = error.error.message;
      }
    );

    const compteur = Observable.interval(500);
    this.counterSubscription = compteur.subscribe(
      () => {
        this.messageService.listerMessage().subscribe(
          (valeur) => {
            this.listeMessages = valeur;
          }, (error) => {
            this.message = error;
          }
        );
      }
    );
  }

  initialiserFormulaire() {
    this.formAjouterMessage = this.formBuilder.group({
      contenu: ['', Validators.required],
      dateMessage: ['', Validators.required]
    });
  }

  validerMessage() {
    // R�cup�ration des donn�es du formulaire
    // Date
    // Collegue
    const emailCollegue = this.collegue.email;
    // Contenue
    const datePublication = this.formAjouterMessage.get('dateMessage').value;
    const contenu = this.formAjouterMessage.get('contenu').value;

    this.messageService.ajouterMessage(datePublication, emailCollegue, contenu).subscribe();
    this.message = "Message validé !";
    this.formAjouterMessage.get('contenu').reset();
  }

}
