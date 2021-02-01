import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { JoueurInfos } from '../models/joueur-infos';
import { BoutiqueService } from '../service/boutique.service';
import { JoueurService } from '../service/joueur.service';
import { ThousandSuffixesPipePipe} from 'src/app/pipe/thousand-suffixes-pipe.pipe'
import { NotificationService } from '../service/notification.service';


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
  constructor(private boutiqueService: BoutiqueService, 
    private joueurService: JoueurService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    // Récupération des informations du joueur
    this.informationsJoueur();
  }

  informationsJoueur() {
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
        /**************/
        /****PIERRE****/
        /**************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE PIERRE
        this.coutGemmePierre10Pourcent = this.infosJoueur.pierreMaximum * 0.1 / 100;
        this.quantiteeRessourcePierre10Pourcent = this.infosJoueur.pierreMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.pierreMaximum * 0.1 + this.infosJoueur.pierrePossession > this.infosJoueur.pierreMaximum) {
          this.coutGemmePierre10Pourcent = (this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession) / 100;
          this.quantiteeRessourcePierre10Pourcent = this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE PIERRE
        this.coutGemmePierre50Pourcent = this.infosJoueur.pierreMaximum * 0.5 / 100;
        this.quantiteeRessourcePierre50Pourcent = this.infosJoueur.pierreMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.pierreMaximum * 0.5 + this.infosJoueur.pierrePossession > this.infosJoueur.pierreMaximum) {
          this.coutGemmePierre50Pourcent = (this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession) / 100;
          this.quantiteeRessourcePierre50Pourcent = this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE PIERRE
        this.coutGemmePierre100Pourcent = this.infosJoueur.pierreMaximum / 100;
        this.quantiteeRessourcePierre100Pourcent = this.infosJoueur.pierreMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.pierreMaximum + this.infosJoueur.pierrePossession > this.infosJoueur.pierreMaximum) {
          this.coutGemmePierre100Pourcent = ((this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession)) / 100;
          this.quantiteeRessourcePierre100Pourcent = this.infosJoueur.pierreMaximum - this.infosJoueur.pierrePossession;
        }

        /**************/
        /*****BOIS*****/
        /**************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE BOIS
        this.coutGemmeBois10Pourcent = this.infosJoueur.boisMaximum * 0.1 / 100;
        this.quantiteeRessourceBois10Pourcent = this.infosJoueur.boisMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.boisMaximum * 0.1 + this.infosJoueur.boisPossession > this.infosJoueur.boisMaximum) {
          this.coutGemmeBois10Pourcent = (this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession) / 100;
          this.quantiteeRessourceBois10Pourcent = this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE BOIS
        this.coutGemmeBois50Pourcent = this.infosJoueur.boisMaximum * 0.5 / 100;
        this.quantiteeRessourceBois50Pourcent = this.infosJoueur.boisMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.boisMaximum * 0.5 + this.infosJoueur.boisPossession > this.infosJoueur.boisMaximum) {
          this.coutGemmeBois50Pourcent = (this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession) / 100;
          this.quantiteeRessourceBois50Pourcent = this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE BOIS
        this.coutGemmeBois100Pourcent = this.infosJoueur.boisMaximum / 100;
        this.quantiteeRessourceBois100Pourcent = this.infosJoueur.boisMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.boisMaximum + this.infosJoueur.boisPossession > this.infosJoueur.boisMaximum) {
          this.coutGemmeBois100Pourcent = ((this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession)) / 100;
          this.quantiteeRessourceBois100Pourcent = this.infosJoueur.boisMaximum - this.infosJoueur.boisPossession;
        }

        /**************/
        /******OR******/
        /**************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE OR
        this.coutGemmeOr10Pourcent = this.infosJoueur.orMaximum * 0.1 / 100;
        this.quantiteeRessourceOr10Pourcent = this.infosJoueur.orMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.orMaximum * 0.1 + this.infosJoueur.orPossession > this.infosJoueur.orMaximum) {
          this.coutGemmeOr10Pourcent = (this.infosJoueur.orMaximum - this.infosJoueur.orPossession) / 100;
          this.quantiteeRessourceOr10Pourcent = this.infosJoueur.orMaximum - this.infosJoueur.orPossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE OR
        this.coutGemmeOr50Pourcent = this.infosJoueur.orMaximum * 0.5 / 100;
        this.quantiteeRessourceOr50Pourcent = this.infosJoueur.orMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.orMaximum * 0.5 + this.infosJoueur.orPossession > this.infosJoueur.orMaximum) {
          this.coutGemmeOr50Pourcent = (this.infosJoueur.orMaximum - this.infosJoueur.orPossession) / 100;
          this.quantiteeRessourceOr50Pourcent = this.infosJoueur.orMaximum - this.infosJoueur.orPossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE OR
        this.coutGemmeOr100Pourcent = this.infosJoueur.orMaximum / 100;
        this.quantiteeRessourceOr100Pourcent = this.infosJoueur.orMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.orMaximum + this.infosJoueur.orPossession > this.infosJoueur.orMaximum) {
          this.coutGemmeOr100Pourcent = ((this.infosJoueur.orMaximum - this.infosJoueur.orPossession)) / 100;
          this.quantiteeRessourceOr100Pourcent = this.infosJoueur.orMaximum - this.infosJoueur.orPossession;
        }

        /******************/
        /****NOURRITURE****/
        /******************/

        /*****10%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 10% DE LA RESERVE DE NOURRITURE
        this.coutGemmeNourriture10Pourcent = this.infosJoueur.nourritureMaximum * 0.1 / 100;
        this.quantiteeRessourceNourriture10Pourcent = this.infosJoueur.nourritureMaximum * 0.1;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.nourritureMaximum * 0.1 + this.infosJoueur.nourriturePossession > this.infosJoueur.nourritureMaximum) {
          this.coutGemmeNourriture10Pourcent = (this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession) / 100;
          this.quantiteeRessourceNourriture10Pourcent = this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession;
        }

        /*****50%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 50% DE LA RESERVE DE NOURRITURE
        this.coutGemmeNourriture50Pourcent = this.infosJoueur.nourritureMaximum * 0.5 / 100;
        this.quantiteeRessourceNourriture50Pourcent = this.infosJoueur.nourritureMaximum * 0.5;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.nourritureMaximum * 0.5 + this.infosJoueur.nourriturePossession > this.infosJoueur.nourritureMaximum) {
          this.coutGemmeNourriture50Pourcent = (this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession) / 100;
          this.quantiteeRessourceNourriture50Pourcent = this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession;
        }

        /*****100%******/
        // CALCUL DU COUT EN GEMME DE L'ACHAT DE 100% DE LA RESERVE DE NOURRITURE
        this.coutGemmeNourriture100Pourcent = this.infosJoueur.nourritureMaximum / 100;
        this.quantiteeRessourceNourriture100Pourcent = this.infosJoueur.nourritureMaximum;
        // SI LIMITE RESSOURCE ATTEINTE, REDEFINITION DU COUT EN GEMMES
        if (this.infosJoueur.nourritureMaximum + this.infosJoueur.nourriturePossession > this.infosJoueur.nourritureMaximum) {
          this.coutGemmeNourriture100Pourcent = ((this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession)) / 100;
          this.quantiteeRessourceNourriture100Pourcent = this.infosJoueur.nourritureMaximum - this.infosJoueur.nourriturePossession;
        }


      }
    );
  }

  // Pierre
  // 10%
  achat10PourcentPierre() {
    this.informationsJoueur();
    let quantiteePierrePossede = this.infosJoueur.pierrePossession;
    let limitePierre = this.infosJoueur.pierreMaximum;
    let quantiteePierre10pourcent = limitePierre * 0.1;
    let coutGemme = quantiteePierre10pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteePierrePossede == limitePierre) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limitePierre * 0.1 + quantiteePierrePossede > limitePierre) {
        coutGemme = (limitePierre - quantiteePierrePossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteePierre10pourcent+" Pierres.", "Achat effectué.");
        });
      }
    }
  }
  // 50%
  achat50PourcentPierre() {
    this.informationsJoueur();
    let quantiteePierrePossede = this.infosJoueur.pierrePossession;
    let limitePierre = this.infosJoueur.pierreMaximum;
    let quantiteePierre50pourcent = limitePierre * 0.5;
    let coutGemme = quantiteePierre50pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteePierrePossede == limitePierre) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limitePierre * 0.5 + quantiteePierrePossede > limitePierre) {
        coutGemme = (limitePierre - quantiteePierrePossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteePierre50pourcent+" Pierres.", "Achat effectué.");
        });
      }
    }
  }
  // 100%
  achat100PourcentPierre() {
    this.informationsJoueur();
    let quantiteePierrePossede = this.infosJoueur.pierrePossession;
    let limitePierre = this.infosJoueur.pierreMaximum;
    let quantiteePierre100pourcent = limitePierre;
    let coutGemme = quantiteePierre100pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteePierrePossede == limitePierre) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limitePierre + quantiteePierrePossede > limitePierre) {
        coutGemme = (limitePierre - quantiteePierrePossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteePierre100pourcent+" Pierres.", "Achat effectué.");
        });
      }
    }
  }

  // Bois
  // 10%
  achat10PourcentBois() {
    this.informationsJoueur();
    let quantiteeBoisPossede = this.infosJoueur.boisPossession;
    let limiteBois = this.infosJoueur.boisMaximum;
    let quantiteeBois10pourcent = limiteBois * 0.1;
    let coutGemme = quantiteeBois10pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeBoisPossede == limiteBois) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteBois * 0.1 + quantiteeBoisPossede > limiteBois) {
        coutGemme = (limiteBois - quantiteeBoisPossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeBois10pourcent+" Bois.", "Achat effectué.");
        });
      }
    }
  }
  // 50%
  achat50PourcentBois() {
    this.informationsJoueur();
    let quantiteeBoisPossede = this.infosJoueur.boisPossession;
    let limiteBois = this.infosJoueur.boisMaximum;
    let quantiteeBois50pourcent = limiteBois * 0.5;
    let coutGemme = quantiteeBois50pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeBoisPossede == limiteBois) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteBois * 0.5 + quantiteeBoisPossede > limiteBois) {
        coutGemme = (limiteBois - quantiteeBoisPossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeBois50pourcent+" Bois.", "Achat effectué.");
        });
      }
    }
  }
  // 100%
  achat100PourcentBois() {
    this.informationsJoueur();
    let quantiteeBoisPossede = this.infosJoueur.boisPossession;
    let limiteBois = this.infosJoueur.boisMaximum;
    let quantiteeBois100pourcent = limiteBois;
    let coutGemme = quantiteeBois100pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeBoisPossede == limiteBois) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteBois + quantiteeBoisPossede > limiteBois) {
        coutGemme = (limiteBois - quantiteeBoisPossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeBois100pourcent+" Bois.", "Achat effectué.");
        });
      }
    }
  }

  // Or
  // 10%
  achat10PourcentOr() {
    this.informationsJoueur();
    let quantiteeOrPossede = this.infosJoueur.orPossession;
    let limiteOr = this.infosJoueur.orMaximum;
    let quantiteeOr10pourcent = limiteOr * 0.1;
    let coutGemme = quantiteeOr10pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeOrPossede == limiteOr) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteOr * 0.1 + quantiteeOrPossede > limiteOr) {
        coutGemme = (limiteOr - quantiteeOrPossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeOr10pourcent+" Or.", "Achat effectué.");
        });
      }
    }
  }
  // 50%
  achat50PourcentOr() {
    this.informationsJoueur();
    let quantiteeOrPossede = this.infosJoueur.orPossession;
    let limiteOr = this.infosJoueur.orMaximum;
    let quantiteeOr50pourcent = limiteOr * 0.5;
    let coutGemme = quantiteeOr50pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeOrPossede == limiteOr) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteOr * 0.5 + quantiteeOrPossede > limiteOr) {
        coutGemme = (limiteOr - quantiteeOrPossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeOr50pourcent+" Or.", "Achat effectué.");
        });
      }
    }
  }
  // 100%
  achat100PourcentOr() {
    this.informationsJoueur();
    let quantiteeOrPossede = this.infosJoueur.orPossession;
    let limiteOr = this.infosJoueur.orMaximum;
    let quantiteeOr100pourcent = limiteOr;
    let coutGemme = quantiteeOr100pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeOrPossede == limiteOr) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteOr + quantiteeOrPossede > limiteOr) {
        coutGemme = (limiteOr - quantiteeOrPossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeOr100pourcent+" Or.", "Achat effectué.");
        });
      }
    }
  }

  // Nourriture
  // 10%
  achat10PourcentNourriture() {
    this.informationsJoueur();
    let quantiteeNourriturePossede = this.infosJoueur.nourriturePossession;
    let limiteNourriture = this.infosJoueur.nourritureMaximum;
    let quantiteeNourriture10pourcent = limiteNourriture * 0.1;
    let coutGemme = quantiteeNourriture10pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeNourriturePossede == limiteNourriture) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteNourriture * 0.1 + quantiteeNourriturePossede > limiteNourriture) {
        coutGemme = (limiteNourriture - quantiteeNourriturePossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeNourriture10pourcent+" Nourriture.", "Achat effectué.");
        });
      }
    }
  }
  // 50%
  achat50PourcentNourriture() {
    this.informationsJoueur();
    let quantiteeNourriturePossede = this.infosJoueur.nourriturePossession;
    let limiteNourriture = this.infosJoueur.nourritureMaximum;
    let quantiteeNourriture50pourcent = limiteNourriture * 0.5;
    let coutGemme = quantiteeNourriture50pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeNourriturePossede == limiteNourriture) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteNourriture * 0.5 + quantiteeNourriturePossede > limiteNourriture) {
        coutGemme = (limiteNourriture - quantiteeNourriturePossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeNourriture50pourcent+" Nourriture.", "Achat effectué.");
        });
      }
    }
  }
  // 100%
  achat100PourcentNourriture() {
    this.informationsJoueur();
    let quantiteeNourriturePossede = this.infosJoueur.nourriturePossession;
    let limiteNourriture = this.infosJoueur.nourritureMaximum;
    let quantiteeNourriture100pourcent = limiteNourriture;
    let coutGemme = quantiteeNourriture100pourcent / 100;
    // CAS CAPACITEE STOCKAGE DEPASSEE
    if (quantiteeNourriturePossede == limiteNourriture) {
      this.messageErreur = "Limite de capacitée de stockage atteinte";
    } else {
      // Redéfinition du cout de gemme si approche de la limit
      if (limiteNourriture + quantiteeNourriturePossede > limiteNourriture) {
        coutGemme = (limiteNourriture - quantiteeNourriturePossede)/100;
        console.log("Redéfinition cout en gemme , nouveau : "+coutGemme)
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
          this.notification.showSuccess("+"+quantiteeNourriture100pourcent+" Nourriture.", "Achat effectué.");
        });
      }
    }
  }

}
