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
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
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

  // INITIALISATIONS
  listeMessages = [];
  message: string;
  counterSubscription: Subscription;
  joueur: Joueur;
  messageErreur: string;
  nombreMessages: number;
  formAjouterMessage: FormGroup;
  tempsPresentPage: number = 0;

  // CONSTRUCTEUR
  constructor(private discussionService: DiscussionService,
    private formBuilder: FormBuilder, private authService: AuthService,
    private notification: NotificationService) { }

  // NGONINIT
  ngOnInit(): void {

    this.authService.joueurConnecteObs.subscribe(
      (col) => {
        this.joueur = col;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );

    // Premier listage des messages à l'initialisation
    this.listerMessages();


    this.initialiserFormulaire();

    const compteur = Observable.interval(2000);
    this.counterSubscription = compteur.subscribe(
      () => {
        this.tempsPresentPage = this.tempsPresentPage + 2;
        console.log(this.tempsPresentPage);
        // Si inactivité détectée
        if (this.tempsPresentPage <= 900) {
          this.listerMessages();
        } else {
          this.ngOnDestroy();
        }

      }
    );
  }

  // INITIALISATION DU FORMULAIRE VIDE
  initialiserFormulaire() {
    this.formAjouterMessage = this.formBuilder.group({
      contenu: ['', Validators.required]
    });
  }

  // SERVICE LISTER LES MESSAGES
  listerMessages() {
    this.discussionService.listerMessage().subscribe(
      (valeur) => {
        this.listeMessages = valeur;
        this.listeMessages.forEach(unMessage => {
          if (unMessage.joueur.email == this.joueur.email) {
            unMessage.appartientAuJoueurConnecte = true;
          }
        });
      }, (error) => {
        this.message = error;
      }
    );
  }
  // BOUTON ENVOYER MESSAGE
  validerMessage() {
    const contenu = this.formAjouterMessage.get('contenu').value;
    if (contenu == "" || contenu == null || contenu == '\n') {
      this.notification.showWarning("Erreur", "Message vide.");
    } else {
      this.discussionService.publierMessage(contenu).subscribe();
      this.message = "Message validé !";
      this.formAjouterMessage.get('contenu').reset();
    }
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }


}
