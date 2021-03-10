import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Campagne } from 'src/app/models/campagne';
import { CampagneJoueurService } from 'src/app/service/campagne/campagne-joueur.service';
import { CampagneService } from 'src/app/service/campagne/campagne.service';
import { GenerationRessourcesService } from 'src/app/service/generation-ressources.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-liste-campagnes',
  templateUrl: './liste-campagnes.component.html',
  styleUrls: ['./liste-campagnes.component.scss']
})
export class ListeCampagnesComponent implements OnInit {

  // INITIALISATIONS
  etat: number;
  listeCampagne = [];
  listeCampagneJoueur = [];
  dejaRealisee: boolean = false;
  counterSubscription: Subscription;
  subscriptions: Subscription[] = [];
  campagneEnCours: Boolean = false;
  datee: string;
  plusHautNiveau: number = 0;
  monde: number = 1;
  // Pour désactiver le bouton une fois que le joueur à cliqué sur "Récupérer récompense"
  clickRecuperer = false;

  // CONSTRUCTEUR
  constructor(private campagneService: CampagneService,
    private router: Router,
    private campagneJoueurService: CampagneJoueurService,
    private notification: NotificationService,
    private generationRessourceServices: GenerationRessourcesService) { }

  //NGONINIT
  ngOnInit(): void {
    this.listerLesCampagnesMonde(1);
  }

  // LISTER LES CAMPAGNES SANS FILTRE
  listerCampagnes() {
    this.ngOnDestroy();
    this.campagneService.listerLesCampagnes().subscribe(
      (lesCampagnes) => {
        this.listeCampagne = lesCampagnes;
        this.rechercheCampagne();
      }
    )
  }

  // LISTER LES CAMPAGNES AVEC FILTRE MONDE
  listerLesCampagnesMonde(numeroMonde: number) {
    this.ngOnDestroy();
    this.campagneService.listerLesCampagnesMonde(numeroMonde).subscribe(
      (value) => {
        this.monde = numeroMonde;
        this.listeCampagne = value;
        this.rechercheCampagne();
      }
    )
  }

  rechercheCampagne() {
    // Parcours chaques campagne
    this.listeCampagne.forEach((uneCampagne) => {
      // Les campagnes joueurs
      this.campagneJoueurService.listerCampagneJoueur().subscribe(
        (lesCampagnesJoueur) => {
          this.listeCampagneJoueur = lesCampagnesJoueur;

          // Parcours les campagnes joueur
          this.listeCampagneJoueur.forEach((uneCampagneJoueur) => {

            // Si l'id campagne en cours d'analyse = l'id campagne joueur, alors il l'a déjà faite
            if (uneCampagneJoueur.campagne.id === uneCampagne.id) {
              // SI CAMPAGNE SUCCES + RECOMPENSE RECUPEREE
              if (uneCampagneJoueur.etatCampagne == 2) {
                // MISE A JOUR DU PLUS HAUT NIVEAU DE CAMPAGNE ATTEINT
                if (uneCampagneJoueur.campagne.niveau > this.plusHautNiveau) {
                  this.plusHautNiveau = uneCampagneJoueur.campagne.niveau;
                }
              }
              /*
              * 0 = EN COURS
              * 1 = SUCCES, RECOMPONSE A RECUPERER
              * 2 = SUCCES, DEJA REALISEE
              * 3 = ECHEC
              */
              if (uneCampagneJoueur.etatCampagne == 0) {
                uneCampagne.etat = 0;
              } else if (uneCampagneJoueur.etatCampagne == 1) {
                uneCampagne.etat = 1;
              } else if (uneCampagneJoueur.etatCampagne == 2) {
                uneCampagne.etat = 2;
              } else if (uneCampagneJoueur.etatCampagne == 3) {
                uneCampagne.etat = 3;
              }
              this.etat = uneCampagneJoueur.etatCampagne;
              uneCampagne.dejaRealisee = true;
              uneCampagne.campagneJoueurId = uneCampagneJoueur.id;

              // Si campagne en cours
              var dateMaintenantMillisecondes = new Date().getTime();
              if (dateMaintenantMillisecondes < uneCampagneJoueur.dateFinCampagne) {
                this.campagneEnCours = true;
                uneCampagneJoueur.secondesRestantesCampagne = (uneCampagneJoueur.dateFinCampagne - dateMaintenantMillisecondes) / 1000;
                uneCampagneJoueur.flagEnCoursDeTravail = true;

                // Définis l'interval de l'appel à 1000 ms (1 seconde)
                const compteur = Observable.interval(1000);
                this.counterSubscription = compteur.subscribe(
                  () => {
                    // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                    uneCampagneJoueur.secondesRestantesCampagne--;

                    // SI FIN DU TIMER, REFRESH
                    if (uneCampagneJoueur.secondesRestantesCampagne < 1) {
                      this.listerLesCampagnesMonde(this.monde);
                    }
                    uneCampagneJoueur.dateFinCampagne = uneCampagneJoueur.secondesRestantesCampagne;
                    var date = new Date(null);
                    date.setSeconds(uneCampagneJoueur.dateFinCampagne);
                    uneCampagne.date = date.toISOString().substr(11, 8);
                  }
                );

                // AJOUT DE LA SUBSCRIPTION AU TABLEAU , POUR LE NETTOYAGE FUTUR
                this.subscriptions.push(this.counterSubscription);
              }
            }
          });
        }
      );
    });
  }

  // REDIRECTION DETAIL CAMPAGNE
  detailCampagne(idCampagne: number) {
    this.router.navigate(['detail-campagne/' + idCampagne]);
  }

  // ALERTE
  pasDisponible() {
    this.notification.showError("", "Veuillez compléter les campagnes de niveau inférieur avant.");
  }

  // NETTOIE LE TABLEAU DE SUBSCRIPTIONS
  ngOnDestroy() {
    if (this.counterSubscription) {
      this.subscriptions.forEach(
        (subscription) => subscription.unsubscribe()
      )
    }
  }

  // RECUPERATION DES RECOMPENSES
  recupererRecompense(idCampagne: number, experience: number) {
    this.clickRecuperer = true;
    this.campagneJoueurService.recupererRecompense(idCampagne).subscribe(() => {
      this.notification.showInfo("", "+" + experience + " Experience");
      this.notification.showSuccess("", "Récompense récupérée ! Vos unitées rentrent au campement.");
      this.notification.showSuccess("", "Niveau suivant débloqué.");
      this.generationRessourceServices.onFirstComponentButtonClick();
      this.listerLesCampagnesMonde(this.monde);
    }, (error) => {
      this.notification.showError("", error.error.message);

    });

    
  }

  recupererBackground(isBoss: Boolean, niveau: number) {
    var monstre: String = '';
    var disponibilite: String = '';
    if (isBoss == true) {
      monstre = 'boss';
    } else if (isBoss == false) {
      monstre = 'normal';
    }

    if (this.plusHautNiveau < niveau-1) {
      disponibilite = ' indisponible'
    }
    return monstre + '' + disponibilite
  }
}
