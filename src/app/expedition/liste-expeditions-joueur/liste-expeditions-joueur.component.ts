import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';
import { ExpeditionJoueurService } from 'src/app/service/expedition-joueur.service';
import { GenerationRessourcesService } from 'src/app/service/generation-ressources.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-liste-expeditions-joueur',
  templateUrl: './liste-expeditions-joueur.component.html',
  styleUrls: ['./liste-expeditions-joueur.component.scss']
})
export class ListeExpeditionsJoueurComponent implements OnInit, OnDestroy {

  // INITIALISATIONS
  etat: number;
  result: string;
  counterSubscription: Subscription;
  subscriptions: Subscription[] = []
  listeExpeditionJoueur = [];
  secondesRestantesExpedition: number;
  niveauTableExpedition: number = 0;
  intitulePage: string = "Toutes mes expéditions"
  // Pour désactiver le bouton une fois que le joueur à cliqué sur "Récupérer récompense"
  clickRecuperer = false;
  messageBoutonRecuperationRecompense: string = "Récupérer récompense";

  // CONSTRUCTEUR
  constructor(private expeditionJoueurService: ExpeditionJoueurService,
    private batimentService: BatimentService,
    private batimentJoueurService: BatimentJoueurService,
    private notification: NotificationService,
    private generationRessourceServices: GenerationRessourcesService) { }

  // NGONINIT
  ngOnInit(): void {
    this.verifierNiveauTableExpedition();
    this.listerToutesLesExpeditionsJoueur();
  }

  // AFFICHAGE DE TOUTES LES EXPEDITIONS DU JOUEUR SANS FILTRE
  listerToutesLesExpeditionsJoueur() {
    this.intitulePage = "Toutes mes expéditions";
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

  // Verification possession bâtiment de type "Table d'expédition"
  verifierNiveauTableExpedition() {
    // Récupération liste des batiments
    this.batimentService.listerBatiments().subscribe(
      () => {
        // Récupération liste des batiments du joueur
        this.batimentJoueurService.listerMesBatiments().subscribe(
          (mesBatiments) => {
            // Boucle sur les bâtiments du joueur
            mesBatiments.forEach((monBatiment) => {
              // SI LE JOUER POSSEDE UNE TABLE D'EXPEDITION (id:18), RECUPERATION DU NIVEAU
              if (monBatiment.batiment.idTypeBatiment == 18) {
                // MAINTENANT
                var maintenant = new Date().getTime();
                // SI TABLE D'EXPEDITION N'EST PAS EN CONSTRUCTION
                if (monBatiment.dateFinConstruction < maintenant) {
                  this.niveauTableExpedition = monBatiment.niveau;
                } else {
                  this.niveauTableExpedition = monBatiment.niveau - 1;
                }
              }
            });
          }
        );
      }
    );
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR VICTORIEUSE + RECOMPENSE DEJA RECUPEREE = 2
  listerExpeditionJoueurTermineesVictoire() {
    this.intitulePage = "Expéditions terminées [Victorieuses]";
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
    this.intitulePage = "Expéditions en cours";
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
    this.intitulePage = "Expéditions terminées [Échouées]";
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
    this.intitulePage = "Récompenses en attente";
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
  recupererRecompense(idExpedition: number, experience: number) {

    this.expeditionJoueurService.recupererRecompense(idExpedition).subscribe(
      () => {
        this.clickRecuperer = true;
        this.messageBoutonRecuperationRecompense = "Compte crédité";
        this.notification.showInfo("", "+" + experience + " Experience");
        this.notification.showSuccess("", "Récompense récupérée ! Vos unitées rentrent au campement.");
        this.generationRessourceServices.onFirstComponentButtonClick();
      }, (error) => {
        this.notification.showError("", error.error.message);
      }
    );
    // Refresh ressources header


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
