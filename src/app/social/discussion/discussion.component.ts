import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { DiscussionService } from 'src/app/service/discussion.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  listeMessages: Message[];
  message: string;
  counterSubscription: Subscription;

  // Initialisations
  formAjouterMessage: FormGroup;

  constructor(private discussionService: DiscussionService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.initialiserFormulaire();

    const compteur = Observable.interval(500);
    this.counterSubscription = compteur.subscribe(
      () => {
        this.discussionService.listerMessage().subscribe(
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
      contenu: ['', Validators.required]
    });
  }

  validerMessage() {
    // R�cup�ration des donn�es du formulaire
    const contenu = this.formAjouterMessage.get('contenu').value;

    this.discussionService.publierMessage(contenu).subscribe();
    this.message = "Message validé !";
    this.formAjouterMessage.get('contenu').reset();
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}
