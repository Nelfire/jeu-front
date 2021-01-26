import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ExpeditionJoueur } from 'src/app/models/expedition-joueur';
import { ExpeditionJoueurService } from 'src/app/service/expedition-joueur.service';

@Component({
  selector: 'app-liste-expeditions-joueur',
  templateUrl: './liste-expeditions-joueur.component.html',
  styleUrls: ['./liste-expeditions-joueur.component.scss']
})
export class ListeExpeditionsJoueurComponent implements OnInit, OnDestroy {

  // Initialisation
  etat: number;
  result: string;
  counterSubscription: Subscription;
  subscriptions: Subscription[] = []
  listeExpeditionJoueur = [];
  secondesRestantesExpedition: number;
  // Pour désactiver le bouton une fois que le joueur à cliqué sur "Récupérer récompense"
  clickRecuperer = false;
  messageBoutonRecuperationRecompense: string = "Récupérer récompense";

  constructor(private expeditionJoueurService: ExpeditionJoueurService) { }

  ngOnInit(): void {
    this.listerToutesLesExpeditionsJoueur();
  }

  listerToutesLesExpeditionsJoueur() {
    // NETTOIE LES SUBSCRIPTIONS
    this.ngOnDestroy();
    this.expeditionJoueurService.listerExpeditionJoueur().subscribe(
      (expeditionJoueur) => {
        this.listeExpeditionJoueur = expeditionJoueur;
        this.listeExpeditionJoueur.forEach((uneExpedition) => {
          this.etat = uneExpedition.etatExpedition;
          var dateMaintenantMillisecondes = new Date().getTime();
          // on formate la date de de fin de l'expedition au format 'yyyy-MM-dd hh:mm:ss'
          // Si l'expedition est en cours
          if (dateMaintenantMillisecondes < uneExpedition.dateFinExpedition) {
            uneExpedition.secondesRestantesAmelioration = (uneExpedition.dateFinExpedition - dateMaintenantMillisecondes) / 1000;
            uneExpedition.flagEnCoursDeTravail = true;
            // Définis l'interval de l'appel à 1000 ms (1 seconde)
            const compteur = Observable.interval(1000);
            this.counterSubscription = compteur.subscribe(
              (valeur: number) => {
                // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                uneExpedition.secondesRestantesAmelioration--;
                // SI FIN DU TIMER, REFRESH
                if (uneExpedition.secondesRestantesAmelioration < 1) {
                  this.listerToutesLesExpeditionsJoueur();
                }
                console.log(uneExpedition.secondesRestantesAmelioration);
                uneExpedition.dateFinExpedition = uneExpedition.secondesRestantesAmelioration;
                var date = new Date(null);
                date.setSeconds(uneExpedition.dateFinExpedition);
                uneExpedition.date = date.toISOString().substr(11, 8);
              }
            );
            // AJOUT DE LA SUBSCRIPTION AU TABLEAU , POUR LE NETTOYAGE FUTUR
            this.subscriptions.push(this.counterSubscription);
          }
        });

      }
    );
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR VICTORIEUSE + RECOMPENSE DEJA RECUPEREE = 2
  listerExpeditionJoueurTermineesVictoire() {
    // NETTOIE LES SUBSCRIPTIONS
    this.ngOnDestroy();
    this.expeditionJoueurService.listerExpeditionJoueurTermineesVictoire().subscribe(
      (expeditionJoueur) => {
        this.listeExpeditionJoueur = expeditionJoueur;
        this.listeExpeditionJoueur.forEach((uneExpedition) => {
          this.etat = uneExpedition.etatExpedition;
        });

      }
    );
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR EN COURS = 0
  listerExpeditionJoueurEnCours() {
    // NETTOIE LES SUBSCRIPTIONS
    this.ngOnDestroy();
    this.expeditionJoueurService.listerExpeditionJoueurEnCours().subscribe(
      (expeditionJoueur) => {
        this.listeExpeditionJoueur = expeditionJoueur;
        this.listeExpeditionJoueur.forEach((uneExpedition) => {
          this.etat = uneExpedition.etatExpedition;
          var dateMaintenantMillisecondes = new Date().getTime();
          // on formate la date de de fin de l'expedition au format 'yyyy-MM-dd hh:mm:ss'
          // Si l'expedition est en cours
          if (dateMaintenantMillisecondes < uneExpedition.dateFinExpedition) {
            uneExpedition.secondesRestantesAmelioration = (uneExpedition.dateFinExpedition - dateMaintenantMillisecondes) / 1000;
            uneExpedition.flagEnCoursDeTravail = true;
            // Définis l'interval de l'appel à 1000 ms (1 seconde)
            const compteur = Observable.interval(1000);
            this.counterSubscription = compteur.subscribe(
              (valeur: number) => {
                // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                uneExpedition.secondesRestantesAmelioration--;
                // SI FIN DU TIMER, REFRESH
                if (uneExpedition.secondesRestantesAmelioration < 1) {
                  this.listerExpeditionJoueurEnCours();
                }
                uneExpedition.dateFinExpedition = uneExpedition.secondesRestantesAmelioration;
                var date = new Date(null);
                date.setSeconds(uneExpedition.dateFinExpedition);
                uneExpedition.date = date.toISOString().substr(11, 8);
              }
            );
            // AJOUT DE LA SUBSCRIPTION AU TABLEAU , POUR LE NETTOYAGE FUTUR
            this.subscriptions.push(this.counterSubscription);
          }
        });
      }
    );
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR TERMINEES EN ECHEC = 3
  listerExpeditionJoueurTermineesEchec() {
    // NETTOIE LES SUBSCRIPTIONS
    this.ngOnDestroy();
    this.expeditionJoueurService.listerExpeditionJoueurTermineesEchec().subscribe(
      (expeditionJoueur) => {
        this.listeExpeditionJoueur = expeditionJoueur;
        this.listeExpeditionJoueur.forEach((uneExpedition) => {
          this.etat = uneExpedition.etatExpedition;
        });

      }
    );
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR VICTORIEUSE + RECOMPENSE EN ATTENTE DE RECUPERATION = 1
  listerExpeditionJoueurRecompenseEnAttente() {
    // NETTOIE LES SUBSCRIPTIONS
    this.ngOnDestroy();
    this.expeditionJoueurService.listerExpeditionJoueurRecompenseEnAttente().subscribe(
      (expeditionJoueur) => {
        this.listeExpeditionJoueur = expeditionJoueur;
        this.listeExpeditionJoueur.forEach((uneExpedition) => {
          this.etat = uneExpedition.etatExpedition;
        });
      }
    );
  }

  // RECUPERATION DES RECOMPENSES
  recupererRecompense(idExpedition: number) {
    this.clickRecuperer = true;
    this.messageBoutonRecuperationRecompense = "Compte crédité"
    this.expeditionJoueurService.recupererRecompense(idExpedition).subscribe();
  }

  // NETTOIE LE TABLEAU DE SUBSCRIPTIONS
  ngOnDestroy() {
    if (this.counterSubscription) {
      this.subscriptions.forEach(
        (subscription) => subscription.unsubscribe()
      )
    }
  }

}
