import { Component, ElementRef, OnInit, QueryList, SystemJsNgModuleLoader, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Joueur } from 'src/app/auth/auth.domains';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/service/auth.service';
import { DiscussionService } from 'src/app/service/discussion.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  /**** AUTO SCROLL DOWN [debut] ****/
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  private isNearBottom = true;

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());    
  }

  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }
  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0
      /* ,behavior: 'smooth' */
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }
  
  /**** AUTO SCROLL DOWN [fin] ****/

  listeMessages = [];
  message: string;
  counterSubscription: Subscription;
  joueur: Joueur;
  messageErreur:string;
  nombreMessages: number;


  // Initialisations
  formAjouterMessage: FormGroup;

  constructor(private discussionService: DiscussionService, 
    private formBuilder: FormBuilder,private authService: AuthService,
    private notification: NotificationService) { }

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
    console.log(contenu);
    if(contenu=="" || contenu==null || contenu=='\n') {
      this.notification.showWarning("Erreur", "Message vide.");
    }else {
      this.discussionService.publierMessage(contenu).subscribe();
      this.message = "Message validé !";
      this.formAjouterMessage.get('contenu').reset();
    }


  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
  

}
