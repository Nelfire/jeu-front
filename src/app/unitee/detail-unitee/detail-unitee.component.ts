import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Armee } from 'src/app/models/armee';
import { Batiment } from 'src/app/models/batiment';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { JoueurService } from 'src/app/service/joueur.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-detail-unitee',
  templateUrl: './detail-unitee.component.html',
  styleUrls: ['./detail-unitee.component.scss']
})
export class DetailUniteeComponent implements OnInit {

  // Initialisations
  joueur: JoueurInfos;
  id: number;
  unitee: Unitee;
  messageErreur: string;
  messageValidation: string;
  formCreationUnitee: FormGroup;
  coutPierreFormation: number;
  coutBoisFormation: number;
  coutOrFormation: number;
  coutNourritureFormation: number;
  quantite: number;
  lesUnitees = [];
  armeesDuJoueur: Armee[];
  batimentJoueur: MesBatiments;
  joueurPossedeBatiment: boolean;
  niveauBatimentAssezEleveFormation: boolean;


  // Constructeur
  constructor(private routerLinkActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private uniteeService: UniteeService,
    private armeeService: ArmeeService,
    private router: Router,
    private joueurService: JoueurService,
    private batimentJoueurService: BatimentJoueurService) { }

  ngOnInit(): void {

    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;
      }
    );

    this.initForm();
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    this.uniteeService.detailsUnitee(this.id).subscribe(
      (value) => {
        this.unitee = value;
        this.quantite = 1;
        this.coutPierreFormation = value.coutPierreFormation;
        this.coutBoisFormation = value.coutBoisFormation;
        this.coutOrFormation = value.coutOrFormation;
        this.coutNourritureFormation = value.coutNourritureFormation;

        // Vérification que le joueur possède le bâtiment pour construire l'unitée
        this.batimentJoueurService.listerMesBatiments().subscribe(
          (batimentJoueur) => {
            batimentJoueur.forEach((unBatiment) => {
              // Si le joueur possède le bâtiment
              if(unBatiment.batiment.id===value.idBatimentProvenance) {
                this.joueurPossedeBatiment = true;
                // Si le niveau du bâtiment est suffisement élevé pour la formation de l'unitée
                if(unBatiment.niveau>=value.niveauBatimentNecessaireFormation) {
                  this.niveauBatimentAssezEleveFormation = true;
                }
              }
            });
          });
      }
    );


  }

  initForm() {
    this.formCreationUnitee = this.formBuilder.group({
      quantite: ['', Validators.required],
    });
  }

  produireUnitee() {
    const quantite = this.formCreationUnitee.get('quantite').value;
    this.armeeService.produireUnitee(this.id, quantite).subscribe(
      () => {

      }, (error) => {
        this.messageErreur = error.error.message;
      }, () => {
        this.messageValidation = "Production lancée";
        setTimeout(() => {
          // Redirection au bout de 1,5 secondes
          this.router.navigate(['armee']);
        }, 2000);
      }
    );

  }

  maximum() {
    this.quantite = Math.trunc(this.joueur.pierrePossession / this.unitee.coutPierreFormation);
    if (Math.trunc(this.joueur.boisPossession / this.unitee.coutBoisFormation) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.boisPossession / this.unitee.coutBoisFormation);
    }
    if (Math.trunc(this.joueur.orPossession / this.unitee.coutOrFormation) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.orPossession / this.unitee.coutOrFormation);
    }
    if (Math.trunc(this.joueur.nourriturePossession / this.unitee.coutNourritureFormation) < this.quantite) {
      this.quantite = Math.trunc(this.joueur.nourriturePossession / this.unitee.coutNourritureFormation);
    }
    this.recalculPrix(Math.trunc(this.quantite));
  }

  recalculPrix(qt: number) {
    this.coutPierreFormation = this.unitee.coutPierreFormation * qt;
    this.coutBoisFormation = this.unitee.coutBoisFormation * qt;
    this.coutOrFormation = this.unitee.coutOrFormation * qt;
    this.coutNourritureFormation = this.unitee.coutNourritureFormation * qt;
  }



  // Batiments Joueur Amélioration Colorisation ressources
  getColorRessourceManquantePierre() {
    if (this.joueur.pierrePossession < this.coutPierreFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteBois() {
    if (this.joueur.boisPossession < this.coutBoisFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteOr() {
    if (this.joueur.orPossession < this.coutOrFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }
  getColorRessourceManquanteNourriture() {
    if (this.joueur.nourriturePossession < this.coutNourritureFormation) {
      return 'red';
    } else {
      return 'green';
    }
  }

}
