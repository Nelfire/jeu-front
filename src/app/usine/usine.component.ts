import { Component, OnInit } from '@angular/core';
import { BatimentJoueurService } from '../service/batiment-joueur.service';
import { JoueurService } from '../service/joueur.service';
import { NotificationService } from '../service/notification.service';
import { MesBatiments } from '../models/mes-batiments';
import { GenerationRessourcesService } from '../service/generation-ressources.service';

@Component({
  selector: 'app-usine',
  templateUrl: './usine.component.html',
  styleUrls: ['./usine.component.scss']
})
export class UsineComponent implements OnInit {

  montantRecoltePierre: number = 0;
  montantRecolteBois: number = 0;
  montantRecolteOr: number = 0;
  montantRecolteNourriture: number = 0;

  // Bâtiments
  carriere: MesBatiments;
  campDeBucheron: MesBatiments;
  campDeMineur: MesBatiments;
  ferme: MesBatiments;
  // Etat bâtiment
  carriereEnCoursDeTravail: boolean;
  campDeBucheronEnCoursDeTravail: boolean;
  campDeMineurEnCoursDeTravail: boolean;
  fermeEnCoursDeTravail: boolean;

  // Police du click
  // --- PIERRE ---
  // - rapidité
  lastClickPierre;
  compteurRapiditeClickPierre = 1;
  // - régularité
  lastEcartClickPierre;
  compteurRegulariteClickPierre = 1;
  // --- BOIS ---
  // - rapidité
  lastClickBois;
  compteurRapiditeClickBois = 1;
  // - régularité
  lastEcartClickBois;
  compteurRegulariteClickBois = 1;
  // --- OR ---
  // - rapidité
  lastClickOr;
  compteurRapiditeClickOr = 1;
  // - régularité
  lastEcartClickOr;
  compteurRegulariteClickOr = 1;
  // --- NOURRITURE ---
  // - rapidité
  lastClickNourriture;
  compteurRapiditeClickNourriture = 1;
  // - régularité
  lastEcartClickNourriture;
  compteurRegulariteClickNourriture = 1;

  // CONSTRUCTEUR
  constructor(private notification: NotificationService,
    private joueurService: JoueurService,
    private batimentJoueurService: BatimentJoueurService,
    private generationRessourceServices : GenerationRessourcesService) { }

  ngOnInit(): void {

    // Vérification bâtiment joueur
    // Carriere
    this.batimentJoueurService.rechercheBatimentJoueur(3).subscribe(
      (batimentPierre) => {
        this.carriere = batimentPierre;
        // Bâtiment en cours de travail ?
        var maintenant = new Date().getTime();
        if (this.carriere.dateFinConstruction > maintenant) {
          this.carriereEnCoursDeTravail = true;
        }
      }
    );
    // Camp de bucheron
    this.batimentJoueurService.rechercheBatimentJoueur(4).subscribe(
      (batimentBois) => {
        this.campDeBucheron = batimentBois;
        // Bâtiment en cours de travail ?
        var maintenant = new Date().getTime();
        if (this.campDeBucheron.dateFinConstruction > maintenant) {
          this.campDeBucheronEnCoursDeTravail = true;
        }
      }
    );
    // Camp de mineur
    this.batimentJoueurService.rechercheBatimentJoueur(5).subscribe(
      (batimentOr) => {
        this.campDeMineur = batimentOr;
        var maintenant = new Date().getTime();
        if (this.campDeMineur.dateFinConstruction > maintenant) {
          this.campDeMineurEnCoursDeTravail = true;
        }
      }
    );
    // Ferme
    this.batimentJoueurService.rechercheBatimentJoueur(6).subscribe(
      (batimentNourriture) => {
        this.ferme = batimentNourriture;
        var maintenant = new Date().getTime();
        if (this.ferme.dateFinConstruction > maintenant) {
          this.fermeEnCoursDeTravail = true;
        }
      }
    );
  }

  recolterPierre() {
    // Cas bâtiment manquant
    if (this.carriere.niveau == null) {
      this.notification.showError("Vous ne possédez pas encore de carrière de pierre", "Erreur...");
    }
    else // Sinon : 1 Clique = Equivalent de 2 secondes de génération de ressource
    {
      var maintenant = new Date().getTime();
      // Bâtiment en cours de travail ?
      if (this.carriere.dateFinConstruction > maintenant) {
        this.carriereEnCoursDeTravail = true;
        this.notification.showWarning("Votre carrière de pierre est en cours d'amélioration", "Patience...");
      } else {
        this.carriereEnCoursDeTravail = false;
        // Police du clic (Rapiditée) -70ms
        console.log("maintenant :" + maintenant);
        console.log("this.lastClickPierre :" + this.lastClickPierre);
        var maintenant = new Date().getTime();
        var ecart = maintenant - this.lastClickPierre;
        console.log("ecart :" + ecart)
        if (ecart < 90) {
          this.compteurRapiditeClickPierre++;
          console.log(this.compteurRapiditeClickPierre);
          // Si rapiditée répétée : Suspect
          if (this.compteurRapiditeClickPierre > 15) {
            this.notification.showError("Vraiment rapide le bonhomme ! N'utiliserais tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation du farm
            this.compteurRapiditeClickPierre = 0;
            this.montantRecoltePierre = 0;
            this.montantRecolteBois = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastClickPierre = new Date().getTime();

        // Police du clic (régularité)
        if (ecart == this.lastEcartClickPierre) {
          this.compteurRegulariteClickPierre++;
          // Si régulérité répétée : Suspect
          if (this.compteurRegulariteClickPierre > 15) {
            this.notification.showError("Vraiment réguliers les clics ! N'utiliserais-tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation
            this.compteurRegulariteClickPierre = 0;
            this.montantRecoltePierre = 0;
            this.montantRecolteBois = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastEcartClickPierre = ecart;
        // Ajout
        this.montantRecoltePierre = Math.round(this.montantRecoltePierre + ((this.carriere.apportPierreHeure) / 3600) * 2);
      }
    }

  }
  recolterBois() {
    // Cas bâtiment manquant
    if (this.campDeBucheron.niveau == null) {
      this.notification.showError("Vous ne possédez pas encore de camp de bûcheron", "Erreur...");
    }
    else // Sinon : 1 Clique = Equivalent de 2 secondes de génération de ressource
    {
      var maintenant = new Date().getTime();
      // Bâtiment en cours de travail ?
      if (this.campDeBucheron.dateFinConstruction > maintenant) {
        this.campDeBucheronEnCoursDeTravail = true;
        this.notification.showWarning("Votre camp de bûcheron est en cours d'amélioration", "Patience...");
      } else {
        this.campDeBucheronEnCoursDeTravail = false;
        // Police du clic (Rapiditée) -70ms
        var maintenant = new Date().getTime();
        var ecart = maintenant - this.lastClickBois;
        if (ecart < 70) {
          this.compteurRapiditeClickBois++;
          // Si rapiditée répétée : Suspect
          if (this.compteurRapiditeClickBois > 15) {
            this.notification.showError("Vraiment rapide le bonhomme ! N'utiliserais tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation du farm
            this.compteurRapiditeClickBois = 0;
            this.montantRecolteBois = 0;
            this.montantRecolteBois = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastClickBois = new Date().getTime();

        // Police du clic (régularité)
        if (ecart == this.lastEcartClickBois) {
          this.compteurRegulariteClickBois++;
          // Si régulérité répétée : Suspect
          if (this.compteurRegulariteClickBois > 15) {
            this.notification.showError("Vraiment réguliers les clics ! N'utiliserais-tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation
            this.compteurRegulariteClickBois = 0;
            this.montantRecolteBois = 0;
            this.montantRecolteBois = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastEcartClickBois = ecart;
        // Ajout
        this.montantRecolteBois = Math.round(this.montantRecolteBois + ((this.campDeBucheron.apportBoisHeure) / 3600) * 2);
      }
    }
  }
  recolterOr() {
    // Cas bâtiment manquant
    if (this.campDeMineur.niveau == null) {
      this.notification.showError("Vous ne possédez pas encore de mine d'or", "Erreur...");
    }
    else // Sinon : 1 Clique = Equivalent de 2 secondes de génération de ressource
    {
      var maintenant = new Date().getTime();
      // Bâtiment en cours de travail ?
      if (this.campDeMineur.dateFinConstruction > maintenant) {
        this.campDeMineurEnCoursDeTravail = true;
        this.notification.showWarning("Votre mine d'or est en cours d'amélioration", "Patience...");
      } else {
        this.campDeMineurEnCoursDeTravail = false;
        // Police du clic (Rapiditée) -70ms
        var maintenant = new Date().getTime();
        var ecart = maintenant - this.lastClickOr;
        if (ecart < 70) {
          this.compteurRapiditeClickOr++;
          // Si rapiditée répétée : Suspect
          if (this.compteurRapiditeClickOr > 15) {
            this.notification.showError("Vraiment rapide le bonhomme ! N'utiliserais tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation du farm
            this.compteurRapiditeClickOr = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastClickOr = new Date().getTime();

        // Police du clic (régularité)
        if (ecart == this.lastEcartClickOr) {
          this.compteurRegulariteClickOr++;
          // Si régulérité répétée : Suspect
          if (this.compteurRegulariteClickOr > 15) {
            this.notification.showError("Vraiment réguliers les clics ! N'utiliserais-tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation
            this.compteurRegulariteClickOr = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastEcartClickOr = ecart;
        // Ajout
        this.montantRecolteOr = Math.round(this.montantRecolteOr + ((this.campDeMineur.apportOreHeure) / 3600) * 2);
      }
    }
  }
  recolterNourriture() {
    // Cas bâtiment manquant
    if (this.ferme.niveau == null) {
      this.notification.showError("Vous ne possédez pas encore de ferme", "Erreur...");
    }
    else // Sinon : 1 Clique = Equivalent de 2 secondes de génération de ressource
    {
      var maintenant = new Date().getTime();
      // Bâtiment en cours de travail ?
      if (this.ferme.dateFinConstruction > maintenant) {
        this.fermeEnCoursDeTravail = true;
        this.notification.showWarning("Votre ferme est en cours d'amélioration", "Patience...");
      } else {
        this.fermeEnCoursDeTravail = false;
        // Police du clic (Rapiditée) -70ms
        var maintenant = new Date().getTime();
        var ecart = maintenant - this.lastClickNourriture;
        if (ecart < 70) {
          this.compteurRapiditeClickNourriture++;
          // Si rapiditée répétée : Suspect
          if (this.compteurRapiditeClickNourriture > 15) {
            this.notification.showError("Vraiment rapide le bonhomme ! N'utiliserais tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation du farm
            this.compteurRapiditeClickNourriture = 0;
            this.montantRecolteNourriture = 0;
            this.montantRecolteNourriture = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastClickNourriture = new Date().getTime();

        // Police du clic (régularité)
        if (ecart == this.lastEcartClickNourriture) {
          this.compteurRegulariteClickNourriture++;
          // Si régulérité répétée : Suspect
          if (this.compteurRegulariteClickNourriture > 15) {
            this.notification.showError("Vraiment réguliers les clics ! N'utiliserais-tu pas un logiciel pour t'aider à faire ça ? Le prochain avertissement te vaudra une pénalité ! Retrait de la production pour le moment !", "Oh oh oh !!");
            // Réinitialisation
            this.compteurRegulariteClickNourriture = 0;
            this.montantRecolteNourriture = 0;
            this.montantRecolteNourriture = 0;
            this.montantRecolteOr = 0;
            this.montantRecolteNourriture = 0;
          }
        }
        this.lastEcartClickNourriture = ecart;
        // Ajout
        this.montantRecolteNourriture = Math.round(this.montantRecolteNourriture + ((this.ferme.apportNourritureHeure) / 3600) * 2);
      }
    }
  }

  recupererProduction() {
    if (this.montantRecoltePierre != 0 || this.montantRecolteBois != 0 || this.montantRecolteOr != 0 || this.montantRecolteNourriture != 0) {
      this.joueurService.attributionRessources(this.montantRecoltePierre, this.montantRecolteBois, this.montantRecolteOr, this.montantRecolteNourriture).subscribe(
        () => {
          this.notification.showSuccess("Production récupérée avec succès", "Beau travail !");
          this.montantRecoltePierre = 0;
          this.montantRecolteBois = 0;
          this.montantRecolteOr = 0;
          this.montantRecolteNourriture = 0;
          this.generationRessourceServices.onFirstComponentButtonClick();
        }, (error) => {
          this.notification.showError(error.error.message, "Oups...");
        }
      );
    } else {
      this.notification.showWarning("Vous n'avez pas encore produit de ressource", "Au boulot !");
    }


  }

  getOpacityCarriere() {
    var maintenant = new Date().getTime();
    if (this.carriere.niveau == null || this.carriere.dateFinConstruction > maintenant) {
      return "50%";
    }
  }
  getOpacityCampDeBucheron() {
    var maintenant = new Date().getTime();
    if (this.campDeBucheron.niveau == null || this.campDeBucheron.dateFinConstruction > maintenant) {
      return "50%";
    }
  }
  getOpacityCampDeMineur() {
    var maintenant = new Date().getTime();
    if (this.campDeMineur.niveau == null || this.campDeMineur.dateFinConstruction > maintenant) {
      return "50%";
    }
  }
  getOpacityFerme() {
    var maintenant = new Date().getTime();
    if (this.ferme.niveau == null || this.ferme.dateFinConstruction > maintenant) {
      return "50%";
    }
  }

}
