import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurInfos } from '../models/joueur-infos';
import { JoueurService } from '../service/joueur.service';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.scss']
})
export class MarcheComponent implements OnInit {

  infosJoueur: JoueurInfos;
  formMarche: FormGroup;
  quantitePierre: number;
  quantiteBois: number;
  quantiteOr: number;
  quantiteNourriture: number;


  // Partie de droite (Echange)
  montantPierreEchange: number;
  montantBoisEchange: number;
  montantOrEchange: number;
  montantNourritureEchange: number;


  constructor(private joueurService: JoueurService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //Initialisation du formulaire vide
    this.formMarche = this.formBuilder.group({
      pierreJoueur: [''],
      boisJoueur: [''],
      orJoueur: [''],
      nourritureJoueur: ['']
    });

    // Informations du joueur
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
  }

  validerEchange() {
    const pierreJoueur = this.formMarche.get('pierreJoueur').value;
    const boisJoueur = this.formMarche.get('boisJoueur').value;
    const orJoueur = this.formMarche.get('orJoueur').value;
    const nourritureJoueur = this.formMarche.get('nourritureJoueur').value;

    console.log(pierreJoueur)
    console.log(boisJoueur)
    console.log(orJoueur)
    console.log(nourritureJoueur)
  }

  pierre(quantitePierre:number) {
    this.montantPierreEchange = quantitePierre;
    this.montantBoisEchange = Math.round(quantitePierre*1.5);
    this.montantOrEchange = Math.round(quantitePierre*0.66);
    this.montantNourritureEchange = Math.round(quantitePierre*3);
  }
  bois(quantiteBois:number) {
    this.montantPierreEchange = Math.round(quantiteBois*0.66);
    this.montantBoisEchange = quantiteBois;
    this.montantOrEchange = Math.round(quantiteBois*0.4);
    this.montantNourritureEchange = Math.round(quantiteBois*2);
  }
  or(quantiteOr:number) {
    this.montantPierreEchange = Math.round(quantiteOr*1.66);
    this.montantBoisEchange = Math.round(quantiteOr*2.5);
    this.montantOrEchange = quantiteOr;
    this.montantNourritureEchange = Math.round(quantiteOr*5);
  }
  nourriture(quantiteNourriture:number) {
    this.montantPierreEchange = Math.round(quantiteNourriture*0.33);
    this.montantBoisEchange = Math.round(quantiteNourriture*0.5);
    this.montantOrEchange = Math.round(quantiteNourriture*0.2);
    this.montantNourritureEchange = quantiteNourriture*5;
  }

}
