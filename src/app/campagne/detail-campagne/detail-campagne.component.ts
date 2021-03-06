import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Armee } from 'src/app/models/armee';
import { Campagne } from 'src/app/models/campagne';
import { CampagneJoueur } from 'src/app/models/campagne-joueur';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import { CampagneJoueurService } from 'src/app/service/campagne/campagne-joueur.service';
import { CampagneService } from 'src/app/service/campagne/campagne.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-detail-campagne',
  templateUrl: './detail-campagne.component.html',
  styleUrls: ['./detail-campagne.component.scss']
})
export class DetailCampagneComponent implements OnInit {

  // INITIALISATIONS
  campagne: Campagne;
  formEnvoiUniteesEnCampagne: FormGroup;
  armeesDuJoueur = [];
  degatsEmis: number = 0;
  toutesLesUnitees: Unitee[];
  vieAdverse: number;
  reussitePourcentage: number = 0;
  flagErreurEnvoi: boolean;
  clicked = false;
  campagnesRealiseesJoueur: CampagneJoueur[];
  plusHautNiveauDeReussite: number = 1;

  // CONSTRUCTEUR
  constructor(private routerLinkActive: ActivatedRoute,
    private campagneService: CampagneService,
    private armeeService: ArmeeService,
    private uniteeService: UniteeService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private router: Router,
    private campagneJoueurService: CampagneJoueurService) { }

  //NGONINIT
  ngOnInit(): void {
    this.initForm();
    this.campagneService.detailsCampagne(this.routerLinkActive.snapshot.params['id']).subscribe(
      (value) => {
        this.campagne = value;
        this.vieAdverse = value.unitee.vie * value.quantitee;
      }
    );

    // Récupération des unitées du joueur (Ses différentes armées)
    this.armeeService.listerArmeesDuJoueur().subscribe(
      (armeesJoueur) => {
        this.armeesDuJoueur = armeesJoueur;
        // Vérifier les reeles quantités (Retirer les unitées en cours de formation)
        this.armeesDuJoueur.forEach(larmee => {
          // Vérification formation en cours
          var dateMaintenantMillisecondes = new Date().getTime();
          if (larmee.dateFinProduction > dateMaintenantMillisecondes) {
            // formation en cours
            let difference = (larmee.dateFinProduction - dateMaintenantMillisecondes) / 1000;
            let uniteesEnFormation = difference / larmee.unitee.tempsFormation;
            // Unitées totales possédées - Unitées en formation
            larmee.quantiteePossession = larmee.quantitee - Math.ceil(uniteesEnFormation);
          } else {
            // pas de formation en cours
            larmee.quantiteePossession = larmee.quantitee;
          }
        });

      }
    );

    this.uniteeService.listerDifferentesUnitees().subscribe(
      (uneUnitee) => {
        this.toutesLesUnitees = uneUnitee;
      }
    );

    // SCAN DE TOUTES LES CAMPAGNES QUE LE JOUEUR A DEJA LANCE
    this.campagneJoueurService.listerCampagneJoueur().subscribe(
      (value) => {
        this.campagnesRealiseesJoueur = value;

        // PARCOURS LES CAMPAGNES
        this.campagnesRealiseesJoueur.forEach(element => {
          // SI REUSSITE
          if (element.etatCampagne == 2) {
            // SI PLUS HAUT NIVEAU DE REUSSITE DETECTE , REMPLACEMENT
            if (element.campagne.niveau > this.plusHautNiveauDeReussite) {
              this.plusHautNiveauDeReussite = element.campagne.niveau;
            }
          }
        });
      }
    )
  }

  initForm() {
    this.formEnvoiUniteesEnCampagne = this.formBuilder.group({
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
  envoiCampagne() {
    this.flagErreurEnvoi = false;

    //1 villageois 
    const nombreVillageois = this.formEnvoiUniteesEnCampagne.get('unitee1').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee1').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee1').value;
    //2 archer 
    const nombreArcher = this.formEnvoiUniteesEnCampagne.get('unitee2').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee2').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee2').value;
    //3 archerComposite
    const nombreArcherComposite = this.formEnvoiUniteesEnCampagne.get('unitee3').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee3').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee3').value;
    //4 fantassinEpee
    const nombreFantassinEpee = this.formEnvoiUniteesEnCampagne.get('unitee4').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee4').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee4').value;
    //5 piquier 
    const nombrePiquier = this.formEnvoiUniteesEnCampagne.get('unitee5').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee5').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee5').value;
    //6 lanceurDeHache
    const nombreLanceurDeHache = this.formEnvoiUniteesEnCampagne.get('unitee6').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee6').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee6').value;
    //7 milicien 
    const nombreMilicien = this.formEnvoiUniteesEnCampagne.get('unitee7').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee7').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee7').value;
    //8 homme d'arme 
    const nombreHommeDArme = this.formEnvoiUniteesEnCampagne.get('unitee8').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee8').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee8').value;
    //9 cavalierArcher
    const nombreCavalierArcher = this.formEnvoiUniteesEnCampagne.get('unitee9').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee9').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee9').value;
    //10 cavalier
    const nombreCavalier = this.formEnvoiUniteesEnCampagne.get('unitee10').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee10').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee10').value;
    //11 champion 
    const nombreChampion = this.formEnvoiUniteesEnCampagne.get('unitee11').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee11').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee11').value;
    //12 bateauDePeche 
    const nombreBateauDePeche = this.formEnvoiUniteesEnCampagne.get('unitee12').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee12').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee12').value;
    //13 bateauIncendiaire 
    const nombreBateauIncendiaire = this.formEnvoiUniteesEnCampagne.get('unitee13').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee13').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee13').value;
    //14 bateauDeDestruction
    const nombreBateauDeDestruction = this.formEnvoiUniteesEnCampagne.get('unitee14').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee14').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee14').value;
    //15 galionACanon
    const nombreGalionACanon = this.formEnvoiUniteesEnCampagne.get('unitee15').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee15').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee15').value;
    //16 galion
    const nombreGalion = this.formEnvoiUniteesEnCampagne.get('unitee16').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee16').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee16').value;
    //17 guerrierElite
    const nombreGuerrierElite = this.formEnvoiUniteesEnCampagne.get('unitee17').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee17').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee17').value;
    //18 phalange
    const nombrePhalange = this.formEnvoiUniteesEnCampagne.get('unitee18').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee18').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee18').value;
    //19 samourail
    const nombreSamourail = this.formEnvoiUniteesEnCampagne.get('unitee19').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee19').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee19').value;
    //20 templier
    const nombreTemplier = this.formEnvoiUniteesEnCampagne.get('unitee20').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee20').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee20').value;
    //21 catapulte
    const nombreCatapulte = this.formEnvoiUniteesEnCampagne.get('unitee21').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee21').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee21').value;
    //22 elephantDeCombat
    const nombreElephantDeCombat = this.formEnvoiUniteesEnCampagne.get('unitee22').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee22').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee22').value;
    //23 pretre
    const nombrePretre = this.formEnvoiUniteesEnCampagne.get('unitee23').value == '' ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee23').value == null ? 0 : this.formEnvoiUniteesEnCampagne.get('unitee23').value;

    // VERIFICATION LIMITE NON DEPASSEE
    this.armeesDuJoueur.forEach(armee => {

      let quantiteePossession;
      // Vérification formation en cours
      var dateMaintenantMillisecondes = new Date().getTime();
      if (armee.dateFinProduction > dateMaintenantMillisecondes) {
        // formation en cours
        let difference = (armee.dateFinProduction - dateMaintenantMillisecondes) / 1000;
        let uniteesEnFormation = difference / armee.unitee.tempsFormation;
        // Unitées totales possédées - Unitées en formation
        quantiteePossession = armee.quantitee - Math.ceil(uniteesEnFormation);
      } else {
        quantiteePossession = armee.quantite;
      }

      if (armee.unitee.id == 1) { // Villageois
        if (nombreVillageois > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de villageois", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 2) { // archer
        if (nombreArcher > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez d'archers", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 3) { // archerComposite
        if (nombreArcherComposite > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez d'achers composite", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 4) { // fantassinEpee
        if (nombreFantassinEpee > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de fantassins épée", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 5) { // piquier
        if (nombrePiquier > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de piquiers", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 6) { // nombreLanceurDeHache
        if (nombreLanceurDeHache > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de lanceurs de hâche", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 7) { // nombreMilicien
        if (nombreMilicien > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de miliciens", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 8) { // homme d'arme
        if (nombreHommeDArme > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez d'hommes d'arme", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 9) { // nombreCavalierArcher
        if (nombreCavalierArcher > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de cavaliers acher", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 10) { // nombreCavalier
        if (nombreCavalier > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de cavaliers", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 11) { // nombreChampion
        if (nombreChampion > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de champions", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 12) { // nombreBateauDePeche
        if (nombreBateauDePeche > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de bâteaux de pêche", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 13) { // nombreBateauIncendiaire
        if (nombreBateauIncendiaire > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de bâteaux incendiaire", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 14) { // nombreBateauDeDestruction
        if (nombreBateauDeDestruction > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de bâteaux de destruction", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 15) { // nombreGalionACanon
        if (nombreGalionACanon > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de galions à canon", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 16) { // nombreGalion
        if (nombreGalion > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de galions", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 17) { // nombreGuerrierElite
        if (nombreGuerrierElite > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de guerriers élite", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 18) { // nombrePhalange
        if (nombrePhalange > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de phalanges", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 19) { // nombreSamourail
        if (nombreSamourail > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de samourails", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 20) { // nombreTemplier
        if (nombreTemplier > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de templiers", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 21) { // nombreCatapulte
        if (nombreCatapulte > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de catapultes", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 22) { // nombreElephantDeCombat
        if (nombreElephantDeCombat > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez d'éléphants de combat", "Erreur de lancement.");
        }
      } else if (armee.unitee.id == 23) { // nombrePretre
        if (nombrePretre > quantiteePossession) {
          this.flagErreurEnvoi = true;
          this.notification.showError("Vous manquez de prêtres", "Erreur de lancement.");
        }
      }
    });


    if (this.flagErreurEnvoi == false) {
      this.campagneJoueurService.envoiUniteeEnCampagne(
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
        this.notification.showError(error.error.message, "Erreur de lancement.");
      }, () => {
        this.clicked = true;
        this.notification.showSuccess("", "Campagne lancée.");

        setTimeout(() => {
          // Redirection au bout de 1,5 secondes
          this.router.navigate(['campagne']);
        }, 1500);
      });
    }
  }

  calculVieRestanteCampagne() {

    //1 villageois 
    const nombreVillageois = this.formEnvoiUniteesEnCampagne.get('unitee1').value;
    //2 archer 
    const nombreArcher = this.formEnvoiUniteesEnCampagne.get('unitee2').value;
    //3 archerComposite
    const nombreArcherComposite = this.formEnvoiUniteesEnCampagne.get('unitee3').value;
    //4 fantassinEpee
    const nombreFantassinEpee = this.formEnvoiUniteesEnCampagne.get('unitee4').value;
    //5 Piquier
    const nombrePiquier = this.formEnvoiUniteesEnCampagne.get('unitee5').value;
    //6 lanceurDeHache
    const nombreLanceurDeHache = this.formEnvoiUniteesEnCampagne.get('unitee6').value;
    //7 milicien 
    const nombreMilicien = this.formEnvoiUniteesEnCampagne.get('unitee7').value;
    //8 homme d'arme 
    const nombreHommeDArme = this.formEnvoiUniteesEnCampagne.get('unitee8').value;
    //9 cavalierArcher
    const nombreCavalierArcher = this.formEnvoiUniteesEnCampagne.get('unitee9').value;
    //10 cavalier
    const nombreCavalier = this.formEnvoiUniteesEnCampagne.get('unitee10').value;
    //11 champion 
    const nombreChampion = this.formEnvoiUniteesEnCampagne.get('unitee11').value;
    //12 bateauDePeche 
    const nombreBateauDePeche = this.formEnvoiUniteesEnCampagne.get('unitee12').value;
    //13 bateauIncendiaire 
    const nombreBateauIncendiaire = this.formEnvoiUniteesEnCampagne.get('unitee13').value;
    //14 bateauDeDestruction
    const nombreBateauDeDestruction = this.formEnvoiUniteesEnCampagne.get('unitee14').value;
    //15 galionACanon
    const nombreGalionACanon = this.formEnvoiUniteesEnCampagne.get('unitee15').value;
    //16 galion
    const nombreGalion = this.formEnvoiUniteesEnCampagne.get('unitee16').value;
    //17 guerrierElite
    const nombreGuerrierElite = this.formEnvoiUniteesEnCampagne.get('unitee17').value;
    //18 phalange
    const nombrePhalange = this.formEnvoiUniteesEnCampagne.get('unitee18').value;
    //19 samourail
    const nombreSamourail = this.formEnvoiUniteesEnCampagne.get('unitee19').value;
    //20 templier
    const nombreTemplier = this.formEnvoiUniteesEnCampagne.get('unitee20').value;
    //21 catapulte
    const nombreCatapulte = this.formEnvoiUniteesEnCampagne.get('unitee21').value;
    //22 elephantDeCombat
    const nombreElephantDeCombat = this.formEnvoiUniteesEnCampagne.get('unitee22').value;
    //23 pretre
    const nombrePretre = this.formEnvoiUniteesEnCampagne.get('unitee23').value;


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
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombrePiquier;
      } else if (unitee.id == 6) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreLanceurDeHache;
      } else if (unitee.id == 7) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreMilicien;
      } else if (unitee.id == 8) {
        this.degatsEmis = this.degatsEmis + unitee.attaque * nombreHommeDArme;
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
    this.vieAdverse = this.campagne.unitee.vie * this.campagne.quantitee;
    this.vieAdverse = this.vieAdverse - this.degatsEmis;

    // --------POURCENTAGE REUSSI ----------- //
    this.reussitePourcentage = 100 - (((this.vieAdverse * 100) / (this.campagne.unitee.vie * this.campagne.quantitee)));
    // ------------------- //
    if (this.vieAdverse < 0) {
      this.vieAdverse = 0;
      this.reussitePourcentage = 100;
    }
  }

}
