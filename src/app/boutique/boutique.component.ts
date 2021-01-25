import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoutiqueService } from '../service/boutique.service';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit {

  // INITIALISATIONS
  messageValidation: string;
  messageErreur: string;

  constructor(private boutiqueService: BoutiqueService) { }

  ngOnInit(): void {
  }


  // Pierre
  achat10PourcentPierre() {
    console.log("Achat 10% pierre");
    this.boutiqueService.achat10PourcentPierre().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat50PourcentPierre() {
    this.boutiqueService.achat50PourcentPierre().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat100PourcentPierre() {
    this.boutiqueService.achat100PourcentPierre().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }

  // Bois
  achat10PourcentBois() {
    console.log("Achat 10% pierre");
    this.boutiqueService.achat10PourcentBois().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat50PourcentBois() {
    this.boutiqueService.achat50PourcentBois().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat100PourcentBois() {
    this.boutiqueService.achat100PourcentBois().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }

  // Or
  achat10PourcentOr() {
    console.log("Achat 10% pierre");
    this.boutiqueService.achat10PourcentOr().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat50PourcentOr() {
    this.boutiqueService.achat50PourcentOr().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat100PourcentOr() {
    this.boutiqueService.achat100PourcentOr().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }

  // Nourriture
  achat10PourcentNourriture() {
    console.log("Achat 10% pierre");
    this.boutiqueService.achat10PourcentNourriture().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat50PourcentNourriture() {
    this.boutiqueService.achat50PourcentNourriture().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }
  achat100PourcentNourriture() {
    this.boutiqueService.achat100PourcentNourriture().subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Achat effectué";
    });
  }

}
