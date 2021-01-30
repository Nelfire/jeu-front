import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Joueur } from 'src/app/auth/auth.domains';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/service/auth.service';
import { DiscussionService } from 'src/app/service/discussion.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  listeMessages = [];
  message: string;
  counterSubscription: Subscription;
  joueur: Joueur;
  messageErreur:string;
  nombreMessages: number;


  // Initialisations
  formAjouterMessage: FormGroup;

  constructor(private discussionService: DiscussionService, 
    private formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.joueurConnecteObs.subscribe(
      (col) => {
        this.joueur = col;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );


    this.initialiserFormulaire();

    const compteur = Observable.interval(2000);
    this.counterSubscription = compteur.subscribe(
      () => {
        this.discussionService.listerMessage().subscribe(
          (valeur) => {
            this.listeMessages = valeur;
            this.listeMessages.forEach(unMessage => {
              if(unMessage.joueur.email ==this.joueur.email) {
                unMessage.appartientAuJoueurConnecte = true;
              }
            });
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
