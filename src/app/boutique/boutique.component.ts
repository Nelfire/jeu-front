import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { JoueurInfos } from '../models/joueur-infos';
import { BoutiqueService } from '../service/boutique.service';
import { JoueurService } from '../service/joueur.service';
import { ThousandSuffixesPipePipe } from 'src/app/pipe/thousand-suffixes-pipe.pipe'
import { NotificationService } from '../service/notification.service';
import { GenerationRessourcesService } from '../service/generation-ressources.service';


@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit {

  // INITIALISATIONS
  messageValidation: string;
  messageErreur: string;
  infosJoueur: JoueurInfos;
  // Pierre: 10%
  coutGemmePierre10Pourcent: number;
  quantiteeRessourcePierre10Pourcent: number
  // Pierre: 50%
  coutGemmePierre50Pourcent: number;
  quantiteeRessourcePierre50Pourcent: number
  // Pierre: 100%
  coutGemmePierre100Pourcent: number;
  quantiteeRessourcePierre100Pourcent: number
  // Bois: 10%
  coutGemmeBois10Pourcent: number;
  quantiteeRessourceBois10Pourcent: number
  // Bois: 50%
  coutGemmeBois50Pourcent: number;
  quantiteeRessourceBois50Pourcent: number
  // Bois: 100%
  coutGemmeBois100Pourcent: number;
  quantiteeRessourceBois100Pourcent: number
  // Or: 10%
  coutGemmeOr10Pourcent: number;
  quantiteeRessourceOr10Pourcent: number
  // Or: 50%
  coutGemmeOr50Pourcent: number;
  quantiteeRessourceOr50Pourcent: number
  // Or: 100%
  coutGemmeOr100Pourcent: number;
  quantiteeRessourceOr100Pourcent: number
  // Nourriture: 10%
  coutGemmeNourriture10Pourcent: number;
  quantiteeRessourceNourriture10Pourcent: number
  // Nourriture: 50%
  coutGemmeNourriture50Pourcent: number;
  quantiteeRessourceNourriture50Pourcent: number
  // Nourriture: 100%
  coutGemmeNourriture100Pourcent: number;
  quantiteeRessourceNourriture100Pourcent: number

  // CONSTRUCTEUR
  constructor(private boutiqueService: BoutiqueService,
    private joueurService: JoueurService,
    private notification: NotificationService,
    private generationRessourceServices: GenerationRessourcesService) { }

  //NGONINIT
  ngOnInit(): void {
    // Récupération des informations du joueur
    this.informationsJoueur();
  }

  // RE-CALCUL DE TOUS LES TAUX
  informationsJoueur() {
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
        /**************/
        /****PIERRE****/
        /**************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE PIERRE
        this.coutGemmePierre10Pourcent = Math.ceil(this.infosJoueur.pierreMaximum * 0.1 / 3000);
        this.quantiteeRessourcePierre10Pourcent = this.infosJoueur.pierreMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.pierreMaximum * 0.1 + this.infosJoueur.pierrePossession > this.infosJoueur.pierreMaximum) {
          this.coutGemmePierre10Pourcent = Math.ceil((this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession) / 3000);
          this.quantiteeRessourcePierre10Pourcent = this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE PIERRE
        this.coutGemmePierre50Pourcent = Math.ceil(this.infosJoueur.pierreMaximum * 0.5 / 3000);
        this.quantiteeRessourcePierre50Pourcent = this.infosJoueur.pierreMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.pierreMaximum * 0.5 + this.infosJoueur.pierrePossession > this.infosJoueur.pierreMaximum) {
          this.coutGemmePierre50Pourcent = Math.ceil((this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession) / 3000);
          this.quantiteeRessourcePierre50Pourcent = this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE PIERRE
        this.coutGemmePierre100Pourcent = Math.ceil(this.infosJoueur.pierreMaximum / 3000);
        this.quantiteeRessourcePierre100Pourcent = this.infosJoueur.pierreMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.pierreMaximum + this.infosJoueur.pierrePossession > this.infosJoueur.pierreMaximum) {
          this.coutGemmePierre100Pourcent = Math.ceil(((this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession)) / 3000);
          this.quantiteeRessourcePierre100Pourcent = this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession;
        }

        /**************/
        /*****BOIS*****/
        /**************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE BOIS
        this.coutGemmeBois10Pourcent = Math.ceil(this.infosJoueur.boisMaximum * 0.1 / 2000);
        this.quantiteeRessourceBois10Pourcent = this.infosJoueur.boisMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.boisMaximum * 0.1 + this.infosJoueur.boisPossession > this.infosJoueur.boisMaximum) {
          this.coutGemmeBois10Pourcent = Math.ceil((this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession) / 2000);
          this.quantiteeRessourceBois10Pourcent = this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE BOIS
        this.coutGemmeBois50Pourcent = Math.ceil(this.infosJoueur.boisMaximum * 0.5 / 2000);
        this.quantiteeRessourceBois50Pourcent = this.infosJoueur.boisMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.boisMaximum * 0.5 + this.infosJoueur.boisPossession > this.infosJoueur.boisMaximum) {
          this.coutGemmeBois50Pourcent = Math.ceil((this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession) / 2000);
          this.quantiteeRessourceBois50Pourcent = this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE BOIS
        this.coutGemmeBois100Pourcent = Math.ceil(this.infosJoueur.boisMaximum / 2000);
        this.quantiteeRessourceBois100Pourcent = this.infosJoueur.boisMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.boisMaximum + this.infosJoueur.boisPossession > this.infosJoueur.boisMaximum) {
          this.coutGemmeBois100Pourcent = Math.ceil(((this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession)) / 2000);
          this.quantiteeRessourceBois100Pourcent = this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession;
        }

        /**************/
        /******OR******/
        /**************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE OR
        this.coutGemmeOr10Pourcent = Math.ceil(this.infosJoueur.orMaximum * 0.1 / 5000);
        this.quantiteeRessourceOr10Pourcent = this.infosJoueur.orMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.orMaximum * 0.1 + this.infosJoueur.orPossession > this.infosJoueur.orMaximum) {
          this.coutGemmeOr10Pourcent = Math.ceil((this.infosJoueur.orMaximum - this.infosJoueur.orPossession) / 5000);
          this.quantiteeRessourceOr10Pourcent = this.infosJoueur.orMaximum - this.infosJoueur.orPossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE OR
        this.coutGemmeOr50Pourcent = Math.ceil(this.infosJoueur.orMaximum * 0.5 / 5000);
        this.quantiteeRessourceOr50Pourcent = this.infosJoueur.orMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.orMaximum * 0.5 + this.infosJoueur.orPossession > this.infosJoueur.orMaximum) {
          this.coutGemmeOr50Pourcent = Math.ceil((this.infosJoueur.orMaximum - this.infosJoueur.orPossession) / 5000);
          this.quantiteeRessourceOr50Pourcent = this.infosJoueur.orMaximum - this.infosJoueur.orPossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE OR
        this.coutGemmeOr100Pourcent = Math.ceil(this.infosJoueur.orMaximum / 5000);
        this.quantiteeRessourceOr100Pourcent = this.infosJoueur.orMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.orMaximum + this.infosJoueur.orPossession > this.infosJoueur.orMaximum) {
          this.coutGemmeOr100Pourcent = Math.ceil(((this.infosJoueur.orMaximum - this.infosJoueur.orPossession)) / 5000);
          this.quantiteeRessourceOr100Pourcent = this.infosJoueur.orMaximum - this.infosJoueur.orPossession;
        }

        /******************/
        /****NOURRITURE****/
        /******************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE NOURRITURE
        this.coutGemmeNourriture10Pourcent = Math.ceil(this.infosJoueur.nourritureMaximum * 0.1 / 1000);
        this.quantiteeRessourceNourriture10Pourcent = this.infosJoueur.nourritureMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.nourritureMaximum * 0.1 + this.infosJoueur.nourriturePossession > this.infosJoueur.nourritureMaximum) {
          this.coutGemmeNourriture10Pourcent = Math.ceil((this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession) / 1000);
          this.quantiteeRessourceNourriture10Pourcent = this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE NOURRITURE
        this.coutGemmeNourriture50Pourcent = Math.ceil(this.infosJoueur.nourritureMaximum * 0.5 / 1000);
        this.quantiteeRessourceNourriture50Pourcent = this.infosJoueur.nourritureMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.nourritureMaximum * 0.5 + this.infosJoueur.nourriturePossession > this.infosJoueur.nourritureMaximum) {
          this.coutGemmeNourriture50Pourcent = Math.ceil((this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession) / 1000);
          this.quantiteeRessourceNourriture50Pourcent = this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE NOURRITURE
        this.coutGemmeNourriture100Pourcent = Math.ceil(this.infosJoueur.nourritureMaximum / 1000);
        this.quantiteeRessourceNourriture100Pourcent = this.infosJoueur.nourritureMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.nourritureMaximum + this.infosJoueur.nourriturePossession > this.infosJoueur.nourritureMaximum) {
          this.coutGemmeNourriture100Pourcent = Math.ceil(((this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession)) / 1000);
          this.quantiteeRessourceNourriture100Pourcent = this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession;
        }


      }
    );
  }

  // Pierre
  // 10%
  achat10PourcentPierre() {
    //this.informationsJoueur();
    let quantiteePierrePossede = this.infosJoueur.pierrePossession;

    let limitePierre = this.infosJoueur.pierreMaximum;
    let quantiteePierre10pourcent = limitePierre * 0.1;
    let coutGemme = Math.ceil(quantiteePierre10pourcent / 3000);

    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteePierrePossede >= limitePierre) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");

    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limitePierre * 0.1 + quantiteePierrePossede > limitePierre) {
        coutGemme = Math.ceil((limitePierre - quantiteePierrePossede) / 3000);
        quantiteePierre10pourcent = limitePierre - quantiteePierrePossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");

      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat10PourcentPierre().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteePierre10pourcent + " Pierres.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.pierrePossession = this.infosJoueur.pierrePossession + quantiteePierre10pourcent;
        });
      }
    }
  }
  // 50%
  achat50PourcentPierre() {
    //this.informationsJoueur();
    let quantiteePierrePossede = this.infosJoueur.pierrePossession;
    let limitePierre = this.infosJoueur.pierreMaximum;
    let quantiteePierre50pourcent = limitePierre * 0.5;
    let coutGemme = Math.ceil(quantiteePierre50pourcent / 3000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteePierrePossede >= limitePierre) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limitePierre * 0.5 + quantiteePierrePossede > limitePierre) {
        coutGemme = Math.ceil((limitePierre - quantiteePierrePossede) / 3000);
        quantiteePierre50pourcent = limitePierre - quantiteePierrePossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat50PourcentPierre().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteePierre50pourcent + " Pierres.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.pierrePossession = this.infosJoueur.pierrePossession + quantiteePierre50pourcent;

        });
      }
    }
  }
  // 100%
  achat100PourcentPierre() {
    //this.informationsJoueur();
    let quantiteePierrePossede = this.infosJoueur.pierrePossession;
    let limitePierre = this.infosJoueur.pierreMaximum;
    let quantiteePierre100pourcent = limitePierre;
    let coutGemme = Math.ceil(quantiteePierre100pourcent / 3000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteePierrePossede >= limitePierre) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limitePierre + quantiteePierrePossede > limitePierre) {
        coutGemme = Math.ceil((limitePierre - quantiteePierrePossede) / 3000);
        quantiteePierre100pourcent = limitePierre - quantiteePierrePossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat100PourcentPierre().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteePierre100pourcent + " Pierres.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.pierrePossession = this.infosJoueur.pierrePossession + quantiteePierre100pourcent;
        });
      }
    }
  }

  // Bois
  // 10%
  achat10PourcentBois() {
    //this.informationsJoueur();
    let quantiteeBoisPossede = this.infosJoueur.boisPossession;
    let limiteBois = this.infosJoueur.boisMaximum;
    let quantiteeBois10pourcent = limiteBois * 0.1;
    let coutGemme = Math.ceil(quantiteeBois10pourcent / 2000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeBoisPossede >= limiteBois) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteBois * 0.1 + quantiteeBoisPossede > limiteBois) {
        coutGemme = Math.ceil((limiteBois - quantiteeBoisPossede) / 2000);
        quantiteeBois10pourcent = limiteBois - quantiteeBoisPossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat10PourcentBois().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeBois10pourcent + " Bois.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.boisPossession = this.infosJoueur.boisPossession + quantiteeBois10pourcent;
        });
      }
    }
  }
  // 50%
  achat50PourcentBois() {
    //this.informationsJoueur();
    let quantiteeBoisPossede = this.infosJoueur.boisPossession;
    let limiteBois = this.infosJoueur.boisMaximum;
    let quantiteeBois50pourcent = limiteBois * 0.5;
    let coutGemme = Math.ceil(quantiteeBois50pourcent / 2000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeBoisPossede >= limiteBois) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteBois * 0.5 + quantiteeBoisPossede > limiteBois) {
        coutGemme = Math.ceil((limiteBois - quantiteeBoisPossede) / 2000);
        quantiteeBois50pourcent = limiteBois - quantiteeBoisPossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat50PourcentBois().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeBois50pourcent + " Bois.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.boisPossession = this.infosJoueur.boisPossession + quantiteeBois50pourcent;
        });
      }
    }
  }
  // 100%
  achat100PourcentBois() {
    //this.informationsJoueur();
    let quantiteeBoisPossede = this.infosJoueur.boisPossession;
    let limiteBois = this.infosJoueur.boisMaximum;
    let quantiteeBois100pourcent = limiteBois;
    let coutGemme = Math.ceil(quantiteeBois100pourcent / 2000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeBoisPossede >= limiteBois) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteBois + quantiteeBoisPossede > limiteBois) {
        coutGemme = Math.ceil((limiteBois - quantiteeBoisPossede) / 2000);
        quantiteeBois100pourcent = limiteBois - quantiteeBoisPossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat100PourcentBois().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeBois100pourcent + " Bois.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.boisPossession = this.infosJoueur.boisPossession + quantiteeBois100pourcent;
        });
      }
    }
  }

  // Or
  // 10%
  achat10PourcentOr() {
    //this.informationsJoueur();
    let quantiteeOrPossede = this.infosJoueur.orPossession;
    let limiteOr = this.infosJoueur.orMaximum;
    let quantiteeOr10pourcent = limiteOr * 0.1;
    let coutGemme = Math.ceil(quantiteeOr10pourcent / 5000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeOrPossede >= limiteOr) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteOr * 0.1 + quantiteeOrPossede > limiteOr) {
        coutGemme = Math.ceil((limiteOr - quantiteeOrPossede) / 5000);
        quantiteeOr10pourcent = limiteOr - quantiteeOrPossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat10PourcentOr().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeOr10pourcent + " Or.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.orPossession = this.infosJoueur.orPossession + quantiteeOr10pourcent;
        });
      }
    }
  }
  // 50%
  achat50PourcentOr() {
    //this.informationsJoueur();
    let quantiteeOrPossede = this.infosJoueur.orPossession;
    let limiteOr = this.infosJoueur.orMaximum;
    let quantiteeOr50pourcent = limiteOr * 0.5;
    let coutGemme = Math.ceil(quantiteeOr50pourcent / 5000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeOrPossede >= limiteOr) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteOr * 0.5 + quantiteeOrPossede > limiteOr) {
        coutGemme = Math.ceil((limiteOr - quantiteeOrPossede) / 5000);
        quantiteeOr50pourcent = limiteOr - quantiteeOrPossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat50PourcentOr().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeOr50pourcent + " Or.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.orPossession = this.infosJoueur.orPossession + quantiteeOr50pourcent;
        });
      }
    }
  }
  // 100%
  achat100PourcentOr() {
    //this.informationsJoueur();
    let quantiteeOrPossede = this.infosJoueur.orPossession;
    let limiteOr = this.infosJoueur.orMaximum;
    let quantiteeOr100pourcent = limiteOr;
    let coutGemme = Math.ceil(quantiteeOr100pourcent / 5000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeOrPossede >= limiteOr) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteOr + quantiteeOrPossede > limiteOr) {
        coutGemme = Math.ceil((limiteOr - quantiteeOrPossede) / 5000);
        quantiteeOr100pourcent = limiteOr - quantiteeOrPossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat100PourcentOr().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeOr100pourcent + " Or.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.orPossession = this.infosJoueur.orPossession + quantiteeOr100pourcent;
        });
      }
    }
  }

  // Nourriture
  // 10%
  achat10PourcentNourriture() {
    //this.informationsJoueur();
    let quantiteeNourriturePossede = this.infosJoueur.nourriturePossession;
    let limiteNourriture = this.infosJoueur.nourritureMaximum;
    let quantiteeNourriture10pourcent = limiteNourriture * 0.1;
    let coutGemme = Math.ceil(quantiteeNourriture10pourcent / 1000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeNourriturePossede >= limiteNourriture) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteNourriture * 0.1 + quantiteeNourriturePossede > limiteNourriture) {
        coutGemme = Math.ceil((limiteNourriture - quantiteeNourriturePossede) / 1000);
        quantiteeNourriture10pourcent = limiteNourriture - quantiteeNourriturePossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat10PourcentNourriture().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeNourriture10pourcent + " Nourriture.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.nourriturePossession = this.infosJoueur.nourriturePossession + quantiteeNourriture10pourcent;
        });
      }
    }
  }
  // 50%
  achat50PourcentNourriture() {
    //this.informationsJoueur();
    let quantiteeNourriturePossede = this.infosJoueur.nourriturePossession;
    let limiteNourriture = this.infosJoueur.nourritureMaximum;
    let quantiteeNourriture50pourcent = limiteNourriture * 0.5;
    let coutGemme = Math.ceil(quantiteeNourriture50pourcent / 1000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeNourriturePossede >= limiteNourriture) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteNourriture * 0.5 + quantiteeNourriturePossede > limiteNourriture) {
        coutGemme = Math.ceil((limiteNourriture - quantiteeNourriturePossede) / 1000);
        quantiteeNourriture50pourcent = limiteNourriture - quantiteeNourriturePossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat50PourcentNourriture().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeNourriture50pourcent + " Nourriture.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.nourriturePossession = this.infosJoueur.nourriturePossession + quantiteeNourriture50pourcent;
        });
      }
    }
  }
  // 100%
  achat100PourcentNourriture() {
    //this.informationsJoueur();
    let quantiteeNourriturePossede = this.infosJoueur.nourriturePossession;
    let limiteNourriture = this.infosJoueur.nourritureMaximum;
    let quantiteeNourriture100pourcent = limiteNourriture;
    let coutGemme = Math.ceil(quantiteeNourriture100pourcent / 1000);
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeNourriturePossede >= limiteNourriture) {
      this.notification.showError("Limite de capacitée de stockage atteinte", "Limite atteinte");
    } else {
      // Redéfinition du cout de gemme si approche de la limite
      if (limiteNourriture + quantiteeNourriturePossede > limiteNourriture) {
        coutGemme = Math.ceil((limiteNourriture - quantiteeNourriturePossede) / 1000);
        quantiteeNourriture100pourcent = limiteNourriture - quantiteeNourriturePossede;
      }
      // SI GEMMES INSUFISANTES AU COUT
      if (this.infosJoueur.gemmePossession < coutGemme) {
        this.notification.showError("Gemmes insuffisantes", "Erreur lors de l'achat.");
      }
      else // Gemmes suffisantes
      {
        this.boutiqueService.achat100PourcentNourriture().subscribe(() => {
        }, (error) => {
          this.notification.showError(error.error.message, "Erreur lors de l'achat.");
        }, () => {
          this.notification.showSuccess("+" + quantiteeNourriture100pourcent + " Nourriture.", "Achat effectué.");
          this.generationRessourceServices.onFirstComponentButtonClick();
          this.infosJoueur.nourriturePossession = this.infosJoueur.nourriturePossession + quantiteeNourriture100pourcent;
        });
      }
    }
  }

}
