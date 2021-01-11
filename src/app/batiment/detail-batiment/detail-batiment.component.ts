import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from 'src/app/auth/auth.domains';
import { AuthService } from '../../service/auth.service';
import { Batiment } from 'src/app/models/batiment';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { BatimentService } from 'src/app/service/batiment.service';

import { JoueurService } from '../../service/joueur.service';
import { JoueurInfos } from '../../models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { formatDate } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Observable, Subscription } from 'rxjs';
// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-detail-batiment',
  templateUrl: './detail-batiment.component.html',
  styleUrls: ['./detail-batiment.component.scss']
})
export class DetailBatimentComponent implements OnInit {

  joueur: JoueurInfos;

  // Initialisations+
  counterSubscription: Subscription;
  secondesRestantesAmelioration: number;
  idTypeBatiment: number;
  batiment: Batiment;
  messageErreur: String;
  messageValidation: String;
  idBatimentJoueur: number;
  // Permet de savoir si le joueur possède déjà le bâtiment, et connaitre les coûts d'amélioration
  batimentJoueurPossede: MesBatiments;
  // Changement état des boutons
  modeConstructionAmelioration: String = "construction";
  etatBoutonConstruire: String;
  etatBoutonAmeliorer: String;
  flagEnCoursDeTravail: Boolean;

  result: string;

  // Constructeur
  constructor(private authSrv: AuthService,
    private router: Router,
    private routerLinkActive: ActivatedRoute,
    private batimentService: BatimentService,
    private batimentJoueurService: BatimentJoueurService,
    private joueurService: JoueurService) { }

  ngOnInit(): void {

    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;
      }
    );

    // Récupération ID batiment (URL)
    this.idTypeBatiment = this.routerLinkActive.snapshot.params['idTypeBatiment'];
    // Récupération des informations du bâtiment
    this.batimentService.detailsBatiment(this.routerLinkActive.snapshot.params['idTypeBatiment']).subscribe(
      (value) => {
        this.batiment = value;
      }
    );

    // Permet de savoir si le joueur possède déjà le bâtiment, et connaitre les coûts d'amélioration
    this.batimentJoueurService.rechercheBatimentJoueur(this.routerLinkActive.snapshot.params['idTypeBatiment']).subscribe(
      (value) => {
        this.batimentJoueurPossede = value;
        console.log("Ligne 58 " + value.dateDebutConstruction);
        console.log("Ligne 59 " + value.dateFinConstruction);
        // Petite vérification.
        // Cas 1 : Le joueur ne possède pas le bâtiment
        // Cas 2 : Le joueur possède déjà le bâtiment
        if (value.id == null) {
          this.modeConstructionAmelioration = "construction";
          this.etatBoutonConstruire = "disabled";
          this.etatBoutonAmeliorer = "";
        } else {
          this.modeConstructionAmelioration = "amelioration";
          this.etatBoutonConstruire = "";
          this.etatBoutonAmeliorer = "disabled";
        }

        var dateMaintenantMillisecondes = new Date().getTime();
        // Si le batiment est en cours d'amélioration
        if (dateMaintenantMillisecondes < value.dateFinConstruction) {
          // Un booleen passe à true
          this.flagEnCoursDeTravail = true;
          // Je crée un timer de fin d'amélioration (Il prend des millisecondes, et convertis en hh:mm:ss)
          var date = new Date(null);
          date.setMilliseconds(value.dateFinConstruction - dateMaintenantMillisecondes);
          this.result = date.toISOString().substr(11, 8);
          // J'initialise sur la page le nombre de secondes d'amélioration restantes pour le bâtiment
          this.secondesRestantesAmelioration = (value.dateFinConstruction - dateMaintenantMillisecondes) / 1000;


          // ** Actualisation chaques secondes ** */
          // Timer temps amélioration restant
          if (this.secondesRestantesAmelioration > 0) {
            // Définis l'interval de l'appel à 1000 ms (1 seconde)
            const compteur = Observable.interval(1000);
            this.counterSubscription = compteur.subscribe(
              (valeur: number) => {
                // A chaques appel, je réduit de 1 seconde le nombre de secondes présentes dans le compteur
                this.secondesRestantesAmelioration = this.secondesRestantesAmelioration - 1;
                // Je défini une date, pour convertir les secondes en timer (Format hh:mm:ss)
                var date = new Date(null);
                date.setSeconds(this.secondesRestantesAmelioration);
                this.result = date.toISOString().substr(11, 8);
              }
            );
          }
          else // Construction terminée
          {

          }
        }
      }
    );
  }

  // Lancement construction du bâtiment
  construire() {
    this.batimentJoueurService.creerBatimentJoueur(this.idTypeBatiment).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = error.error.message;
      }, () => {
        this.messageValidation = "Construction lancée";
        setTimeout(() => {
          // Redirection au bout de 1,5 secondes
          this.router.navigate(['campement']);
        }, 1500);
      }
    );
  }

  // Lancement construction du bâtiment
  ameliorer() {
    this.batimentJoueurService.ameliorerBatimentJoueur(this.batimentJoueurPossede.id).subscribe(
      () => {
      }, (error) => {
        this.messageErreur = error.error.message;
      }, () => {
        this.messageValidation = "Amélioration lancée";
        setTimeout(() => {
          // Redirection au bout de 1,5 secondes
          this.router.navigate(['campement']);
        }, 1500);
      }
    );
  }

  annuler() {
    console.log("Annulation");
  }

  // Batiments Joueur Amélioration Colorisation ressources
  getColorRessourceManquantePierreBatimentJoueur() {
    if (this.joueur.pierrePossession < this.batimentJoueurPossede.coutPierreAmelioration) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteBoisBatimentJoueur() {
    if (this.joueur.boisPossession < this.batimentJoueurPossede.coutBoisAmelioration) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteOrBatimentJoueur() {
    if (this.joueur.orPossession < this.batimentJoueurPossede.coutOreAmelioration) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteNourritureBatimentJoueur() {
    if (this.joueur.nourriturePossession < this.batimentJoueurPossede.coutNourritureAmelioration) {
      return 'red';
    } else {
      return 'green';
    }
  }
    // Batiments Construction Colorisation ressources
    getColorRessourceManquantePierreBatiment() {
      if (this.joueur.pierrePossession < this.batiment.coutPierreConstruction) {
        return 'red';
      } else {
        return 'green';
      }
    }
    getColorRessourceManquanteBoisBatiment() {
      if (this.joueur.boisPossession < this.batiment.coutBoisConstruction) {
        return 'red';
      } else {
        return 'green';
      }
    }
    getColorRessourceManquanteOrBatiment() {
      if (this.joueur.orPossession < this.batiment.coutOrConstruction) {
        return 'red';
      } else {
        return 'green';
      }
    }
    getColorRessourceManquanteNourritureBatiment() {
      if (this.joueur.nourriturePossession < this.batiment.coutNourritureConstruction) {
        return 'red';
      } else {
        return 'green';
      }
    }

}
