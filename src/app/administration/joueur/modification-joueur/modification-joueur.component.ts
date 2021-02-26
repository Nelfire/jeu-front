import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { JoueurService } from 'src/app/service/joueur.service';

@Component({
  selector: 'app-modification-joueur',
  templateUrl: './modification-joueur.component.html',
  styleUrls: ['./modification-joueur.component.scss']
})
export class ModificationJoueurComponent implements OnInit {

 // Initialisations
 messageValidation: string;
 messageErreur: string;
 id: number;
 joueur: JoueurInfos;
 formModificationJoueur: FormGroup;

 constructor(private router: Router,
   private formBuilder: FormBuilder,
   private routerLinkActive: ActivatedRoute,
   private joueurService: JoueurService) { }

 ngOnInit(): void {

   //Initialisation du formulaire vide
   this.formModificationJoueur = this.formBuilder.group({
     icone: ['', Validators.required],
     pseudo: ['', Validators.required],
     email: ['', Validators.required],
     descriptif: ['', Validators.required],
     niveau: ['', Validators.required],
     experience: ['', Validators.required],
     pierrePossession: ['', Validators.required],
     boisPossession: ['', Validators.required],
     orPossession: ['', Validators.required],
     nourriturePossession: ['', Validators.required],
     gemmePossession: ['', Validators.required],
     pierreMaximum: ['', Validators.required],
     boisMaximum: ['', Validators.required],
     orMaximum: ['', Validators.required],
     nourritureMaximum: ['', Validators.required],
     pierreBoostProduction: ['', Validators.required],
     boisBoostProduction: ['', Validators.required],
     orBoostProduction: ['', Validators.required],
     nourritureBoostProduction: ['', Validators.required],
     tempsDeJeu: ['', Validators.required],
     derniereConnexion: ['']
   });
   // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
   this.id = this.routerLinkActive.snapshot.params['id'];

   this.joueurService.informationJoueurById(this.id).subscribe(
     (value) => {
       this.joueur = value;
       this.initialiserFormulaire();
     }
   );
 }

 initialiserFormulaire() {
   //Initialisation du formulaire avec données
   this.formModificationJoueur = this.formBuilder.group({
    icone: [this.joueur.icone, Validators.required],
    pseudo: [this.joueur.pseudo, Validators.required],
    email: [this.joueur.email, Validators.required],
    descriptif: [this.joueur.descriptif, Validators.required],
    niveau: [this.joueur.niveau, Validators.required],
    experience: [this.joueur.experience, Validators.required],
    pierrePossession: [this.joueur.pierrePossession, Validators.required],
    boisPossession: [this.joueur.boisPossession, Validators.required],
    orPossession: [this.joueur.orPossession, Validators.required],
    nourriturePossession: [this.joueur.nourriturePossession, Validators.required],
    gemmePossession: [this.joueur.gemmePossession, Validators.required],
    pierreMaximum: [this.joueur.pierreMaximum, Validators.required],
    boisMaximum: [this.joueur.boisMaximum, Validators.required],
    orMaximum: [this.joueur.orMaximum, Validators.required],
    nourritureMaximum: [this.joueur.nourritureMaximum, Validators.required],
    pierreBoostProduction: [this.joueur.pierreBoostProduction, Validators.required],
    boisBoostProduction: [this.joueur.boisBoostProduction, Validators.required],
    orBoostProduction: [this.joueur.orBoostProduction, Validators.required],
    nourritureBoostProduction: [this.joueur.nourritureBoostProduction, Validators.required],
    tempsDeJeu: [this.joueur.tempsDeJeu, Validators.required],
    derniereConnexion: [this.joueur.derniereConnexion]
   });
 }

 modificationJoueur() {
   const icone = this.formModificationJoueur.get('icone').value;
   const pseudo = this.formModificationJoueur.get('pseudo').value;
   const email = this.formModificationJoueur.get('email').value;
   const descriptif = this.formModificationJoueur.get('descriptif').value;
   const niveau = this.formModificationJoueur.get('niveau').value;
   const experience = this.formModificationJoueur.get('experience').value;
   const pierrePossession = this.formModificationJoueur.get('pierrePossession').value;
   const boisPossession = this.formModificationJoueur.get('boisPossession').value;
   const orPossession = this.formModificationJoueur.get('orPossession').value;
   const nourriturePossession = this.formModificationJoueur.get('nourriturePossession').value;
   const gemmePossession = this.formModificationJoueur.get('gemmePossession').value;
   const pierreBoostProduction = this.formModificationJoueur.get('pierreBoostProduction').value;
   const boisBoostProduction = this.formModificationJoueur.get('boisBoostProduction').value;
   const orBoostProduction = this.formModificationJoueur.get('orBoostProduction').value;
   const nourritureBoostProduction = this.formModificationJoueur.get('nourritureBoostProduction').value;
   this.joueurService.administrationModificationJoueur(
     this.id,
     icone,
     pseudo,
     email,
     descriptif,
     niveau,
     experience,
     pierrePossession,
     boisPossession,
     orPossession,
     nourriturePossession,
     gemmePossession,
     pierreBoostProduction,
     boisBoostProduction,
     orBoostProduction,
     nourritureBoostProduction
     ).subscribe(
       () => {

       }, (error) => {
         this.messageErreur = error.error.message;
       }, () => {
         this.messageValidation = "Modification réalisée";
         setTimeout(() => {
           // Redirection au bout de 1,5 secondes
           this.router.navigate(['classement-joueurs']);
         }, 1500);
       }
     );
 }

}
