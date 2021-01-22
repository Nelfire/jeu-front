import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Armee } from 'src/app/models/armee';
import { Expedition } from 'src/app/models/expedition';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import { ExpeditionJoueurService } from 'src/app/service/expedition-joueur.service';
import { ExpeditionService } from 'src/app/service/expedition.service';
import { JoueurService } from 'src/app/service/joueur.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-detail-expedition',
  templateUrl: './detail-expedition.component.html',
  styleUrls: ['./detail-expedition.component.scss']
})
export class DetailExpeditionComponent implements OnInit {

  // Initialisations
  i: number;
  joueur: JoueurInfos;
  messageValidation: String;
  messageErreur: String;
  expedition: Expedition;
  armeesDuJoueur: Armee[];
  formEnvoiUniteesEnExpedition: FormGroup;
  toutesLesUnitees: Unitee[];
  degatsEmis: number = 0;
  reussitePourcentage: number = 0;
  messageBoutonEnvoiEnExpedition: string = "Envoyer les unitées en expéditions";
  clicked = false;

  // Données de l'expedition
  // vie
  vieExpedition: number;
  // armure
  armureExpedition: number;
  // degats
  degatsExpedition: number;

  constructor(private formBuilder: FormBuilder,
    private joueurService: JoueurService,
    private expeditionService: ExpeditionService,
    private router: Router,
    private routerLinkActive: ActivatedRoute,
    private armeeService: ArmeeService,
    private expeditionJoueurService: ExpeditionJoueurService,
    private uniteeService: UniteeService) { }

  ngOnInit(): void {
    this.initForm();
    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (infosJoueur) => {
        this.joueur = infosJoueur;
      }
    );

    // Affiche les infos de l'expeditions
    this.expeditionService.detailExpedition(this.routerLinkActive.snapshot.params['id']).subscribe(
      (detailsExpedition) => {
        this.expedition = detailsExpedition;
        // -- Données de l'expedition à exploiter
        this.vieExpedition = detailsExpedition.vie;
        this.armureExpedition = detailsExpedition.armure;
        this.degatsExpedition = detailsExpedition.degats;
      }
    );

    // Récupération des unitées du joueur (Ses différentes armées)
    this.armeeService.listerArmeesDuJoueur().subscribe(
      (armeesJoueur) => {
        this.armeesDuJoueur = armeesJoueur;
      }
    );

    this.uniteeService.listerDifferentesUnitees().subscribe(
      (uneUnitee) => {
        this.toutesLesUnitees = uneUnitee;
      }
    )
  }

  initForm() {
    this.formEnvoiUniteesEnExpedition = this.formBuilder.group({
      //1 - Villageois
      unitee1: [''],
      //2 archer 
      unitee2: [''],
      //3 archerComposite
      unitee3: [''],
      //4 fantassinEpee
      unitee4: [''],
      //5 hommeDArme 
      unitee5: [''],
      //6 lanceurDeHache
      unitee6: [''],
      //7 milicien 
      unitee7: [''],
      //8 piquier 
      unitee8: [''],
      //9 cavalierArcher
      unitee9: [''],
      //10 cavalier
      unitee10: [''],
      //11 champion 
      unitee11: [''],
      //12 bateauDePeche 
      unitee12: [''],
      //13 bateauIncendiaire 
      unitee13: [''],
      //14 bateauDeDestruction
      unitee14: [''],
      //15 galionACanon
      unitee15: [''],
      //16 galion
      unitee16: [''],
      //17 guerrierElite
      unitee17: [''],
      //18 phalange
      unitee18: [''],
      //19 samourail
      unitee19: [''],
      //20 templier
      unitee20: [''],
      //21 catapulte
      unitee21: [''],
      //22 elephantDeCombat
      unitee22: [''],
      //23 pretre
      unitee23: ['']
    });
  }

  envoiExpedition() {
    // Récupération des unitées

    //1 villageois 
    const nombreVillageois = this.formEnvoiUniteesEnExpedition.get('unitee1').value;
    //2 archer 
    const nombreArcher = this.formEnvoiUniteesEnExpedition.get('unitee2').value;
    //3 archerComposite
    const nombreArcherComposite = this.formEnvoiUniteesEnExpedition.get('unitee3').value;
    //4 fantassinEpee
    const nombreFantassinEpee = this.formEnvoiUniteesEnExpedition.get('unitee4').value;
    //5 hommeDArme 
    const nombreHommeDArme = this.formEnvoiUniteesEnExpedition.get('unitee5').value;
    //6 lanceurDeHache
    const nombreLanceurDeHache = this.formEnvoiUniteesEnExpedition.get('unitee6').value;
    //7 milicien 
    const nombreMilicien = this.formEnvoiUniteesEnExpedition.get('unitee7').value;
    //8 piquier 
    const nombrePiquier = this.formEnvoiUniteesEnExpedition.get('unitee8').value;
    //9 cavalierArcher
    const nombreCavalierArcher = this.formEnvoiUniteesEnExpedition.get('unitee9').value;
    //10 cavalier
    const nombreCavalier = this.formEnvoiUniteesEnExpedition.get('unitee10').value;
    //11 champion 
    const nombreChampion = this.formEnvoiUniteesEnExpedition.get('unitee11').value;
    //12 bateauDePeche 
    const nombreBateauDePeche = this.formEnvoiUniteesEnExpedition.get('unitee12').value;
    //13 bateauIncendiaire 
    const nombreBateauIncendiaire = this.formEnvoiUniteesEnExpedition.get('unitee13').value;
    //14 bateauDeDestruction
    const nombreBateauDeDestruction = this.formEnvoiUniteesEnExpedition.get('unitee14').value;
    //15 galionACanon
    const nombreGalionACanon = this.formEnvoiUniteesEnExpedition.get('unitee15').value;
    //16 galion
    const nombreGalion = this.formEnvoiUniteesEnExpedition.get('unitee16').value;
    //17 guerrierElite
    const nombreGuerrierElite = this.formEnvoiUniteesEnExpedition.get('unitee17').value;
    //18 phalange
    const nombrePhalange = this.formEnvoiUniteesEnExpedition.get('unitee18').value;
    //19 samourail
    const nombreSamourail = this.formEnvoiUniteesEnExpedition.get('unitee19').value;
    //20 templier
    const nombreTemplier = this.formEnvoiUniteesEnExpedition.get('unitee20').value;
    //21 catapulte
    const nombreCatapulte = this.formEnvoiUniteesEnExpedition.get('unitee21').value;
    //22 elephantDeCombat
    const nombreElephantDeCombat = this.formEnvoiUniteesEnExpedition.get('unitee22').value;
    //23 pretre
    const nombrePretre = this.formEnvoiUniteesEnExpedition.get('unitee23').value;

    this.expeditionJoueurService.envoiUniteeEnExpedition(
      this.routerLinkActive.snapshot.params['id'],
      nombreVillageois,
      nombreArcher,
      nombreArcherComposite,
      nombreFantassinEpee,
      nombreHommeDArme,
      nombreLanceurDeHache,
      nombreMilicien,
      nombrePiquier,
      nombreCavalierArcher,
      nombreCavalier,
      nombreChampion,
      nombreBateauDePeche,
      nombreBateauIncendiaire,
      nombreBateauDeDestruction,
      nombreGalionACanon,
      nombreGalion,
      nombreGuerrierElite,
      nombrePhalange,
      nombreSamourail,
      nombreTemplier,
      nombreCatapulte,
      nombreElephantDeCombat,
      nombrePretre
    ).subscribe(() => {
    }, (error) => {
      this.messageErreur = error.error.message;
    }, () => {
      this.messageValidation = "Expédition lancée";
      this.clicked = true;
      this.messageBoutonEnvoiEnExpedition = "Envoi en cours...";
      setTimeout(() => {
        // Redirection au bout de 1,5 secondes
        this.router.navigate(['mesExpeditions']);
      }, 1500);
    });
  }

  calculVieRestanteExpedition(quantite: number) {

    //1 villageois 
    const nombreVillageois = this.formEnvoiUniteesEnExpedition.get('unitee1').value;
    //2 archer 
    const nombreArcher = this.formEnvoiUniteesEnExpedition.get('unitee2').value;
    //3 archerComposite
    const nombreArcherComposite = this.formEnvoiUniteesEnExpedition.get('unitee3').value;
    //4 fantassinEpee
    const nombreFantassinEpee = this.formEnvoiUniteesEnExpedition.get('unitee4').value;
    //5 hommeDArme 
    const nombreHommeDArme = this.formEnvoiUniteesEnExpedition.get('unitee5').value;
    //6 lanceurDeHache
    const nombreLanceurDeHache = this.formEnvoiUniteesEnExpedition.get('unitee6').value;
    //7 milicien 
    const nombreMilicien = this.formEnvoiUniteesEnExpedition.get('unitee7').value;
    //8 piquier 
    const nombrePiquier = this.formEnvoiUniteesEnExpedition.get('unitee8').value;
    //9 cavalierArcher
    const nombreCavalierArcher = this.formEnvoiUniteesEnExpedition.get('unitee9').value;
    //10 cavalier
    const nombreCavalier = this.formEnvoiUniteesEnExpedition.get('unitee10').value;
    //11 champion 
    const nombreChampion = this.formEnvoiUniteesEnExpedition.get('unitee11').value;
    //12 bateauDePeche 
    const nombreBateauDePeche = this.formEnvoiUniteesEnExpedition.get('unitee12').value;
    //13 bateauIncendiaire 
    const nombreBateauIncendiaire = this.formEnvoiUniteesEnExpedition.get('unitee13').value;
    //14 bateauDeDestruction
    const nombreBateauDeDestruction = this.formEnvoiUniteesEnExpedition.get('unitee14').value;
    //15 galionACanon
    const nombreGalionACanon = this.formEnvoiUniteesEnExpedition.get('unitee15').value;
    //16 galion
    const nombreGalion = this.formEnvoiUniteesEnExpedition.get('unitee16').value;
    //17 guerrierElite
    const nombreGuerrierElite = this.formEnvoiUniteesEnExpedition.get('unitee17').value;
    //18 phalange
    const nombrePhalange = this.formEnvoiUniteesEnExpedition.get('unitee18').value;
    //19 samourail
    const nombreSamourail = this.formEnvoiUniteesEnExpedition.get('unitee19').value;
    //20 templier
    const nombreTemplier = this.formEnvoiUniteesEnExpedition.get('unitee20').value;
    //21 catapulte
    const nombreCatapulte = this.formEnvoiUniteesEnExpedition.get('unitee21').value;
    //22 elephantDeCombat
    const nombreElephantDeCombat = this.formEnvoiUniteesEnExpedition.get('unitee22').value;
    //23 pretre
    const nombrePretre = this.formEnvoiUniteesEnExpedition.get('unitee23').value;


    this.toutesLesUnitees.forEach(unitee => {
      // Villageois
      if (unitee.id == 1) {
        this.degatsEmis = unitee.attaque * nombreVillageois;
      } else if (unitee.id == 2) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreArcher;
      } else if (unitee.id == 3) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreArcherComposite;
      } else if (unitee.id == 4) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreFantassinEpee;
      } else if (unitee.id == 5) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreHommeDArme;
      } else if (unitee.id == 6) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreLanceurDeHache;
      } else if (unitee.id == 7) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreMilicien;
      } else if (unitee.id == 8) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombrePiquier;
      } else if (unitee.id == 9) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreCavalierArcher;
      } else if (unitee.id == 10) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreCavalier;
      } else if (unitee.id == 11) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreChampion;
      } else if (unitee.id == 12) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreBateauDePeche;
      } else if (unitee.id == 13) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreBateauIncendiaire;
      } else if (unitee.id == 14) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreBateauDeDestruction;
      } else if (unitee.id == 15) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreGalionACanon;
      } else if (unitee.id == 16) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreGalion;
      } else if (unitee.id == 17) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreGuerrierElite;
      } else if (unitee.id == 18) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombrePhalange;
      } else if (unitee.id == 19) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreSamourail;
      } else if (unitee.id == 20) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreTemplier;
      } else if (unitee.id == 21) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreCatapulte;
      } else if (unitee.id == 22) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreElephantDeCombat;
      } else if (unitee.id == 23) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombrePretre;
      }
    });
    // Calcul dégats
    this.vieExpedition = this.expedition.vie;
    this.vieExpedition = this.vieExpedition - this.degatsEmis;
    // --------POURCENTAGE REUSSI ----------- //
    this.reussitePourcentage = 100 - (((this.vieExpedition * 100) / this.expedition.vie));
    // ------------------- //
    if (this.vieExpedition < 0) {
      this.vieExpedition = 0;
      this.reussitePourcentage = 100;
    }
    console.log("Vie expedition : " + this.vieExpedition)
    console.log("Degats emis : " + this.degatsEmis)
  }

  // Batiments Joueur Amélioration Colorisation ressources
  getColorRessourceManquantePierre() {
    if (this.joueur.pierrePossession < this.expedition.coutPierre) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteBois() {
    if (this.joueur.boisPossession < this.expedition.coutBois) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteOr() {
    if (this.joueur.orPossession < this.expedition.coutOr) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteNourriture() {
    if (this.joueur.nourriturePossession < this.expedition.coutNourriture) {
      return 'red';
    } else {
      return 'green';
    }
  }

}
