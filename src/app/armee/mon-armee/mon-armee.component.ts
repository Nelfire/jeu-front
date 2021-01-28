import { Component, OnInit } from '@angular/core';
import { Armee } from 'src/app/models/armee';
import { Batiment } from 'src/app/models/batiment';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { UniteeService } from 'src/app/service/unitee.service';

@Component({
  selector: 'app-mon-armee',
  templateUrl: './mon-armee.component.html',
  styleUrls: ['./mon-armee.component.scss']
})
export class MonArmeeComponent implements OnInit {

  listeUnitees: Unitee[];
  lesUnitees = [];
  armeesDuJoueur: Armee[];
  flag: boolean;
  lesBatimentsDuJoueur: MesBatiments[];
  flagPossedeBatimentNecessaireFormationUnitee: boolean = false;
  flagNiveauBatimentNecessaireFormationUniteeAssezEleve: boolean = false;

  constructor(private uniteeService: UniteeService, private armeeService: ArmeeService, private batimentJoueurService: BatimentJoueurService) { }

  ngOnInit(): void {
    // Scan des bâtiments que possède le joueur, pour indiquer un bâtiment manquant/niveau insufisant
    this.uniteesToutes();
  }

  /*
   * LISTER TOUTES UNITEES
   */
  uniteesToutes() {
    // Récupération liste des unitees (Type:Toutes)
    this.uniteeService.listerDifferentesUnitees().subscribe(
      (value) => {
        this.lesUnitees = value;
      }
    );
    this.listeDesUnitees();
  }

  /*
   * LISTER QUE LES UNITEES DE TYPE DIVERS = 1
   */
  uniteesDivers() {
    // Récupération liste des unitees (Type:Divers)
    this.uniteeService.listerUniteeDivers().subscribe(
      (value) => {
        this.lesUnitees = value;
      }
    );
    this.listeDesUnitees();
  }
  /*
   * LISTER QUE LES UNITEES DE TYPE INFANTERIE = 2
   */
  uniteesInfanterie() {
    // Récupération liste des unitees (Type:Infanterie)
    this.uniteeService.listerUniteeInfanterie().subscribe(
      (value) => {
        this.lesUnitees = value;
      }
    );
    this.listeDesUnitees();
  }
  /*
   * LISTER QUE LES UNITEES DE TYPE CAVALERIE = 3
   */
  uniteesCavalerie() {
    // Récupération liste des unitees (Type:Cavalerie)
    this.uniteeService.listerUniteeCavalerie().subscribe(
      (value) => {
        this.lesUnitees = value;
      }
    );
    this.listeDesUnitees();
  }
  /*
   * LISTER QUE LES UNITEES DE TYPE SIEGE = 4
   */
  uniteesSiege() {
    // Récupération liste des unitees (Type:Siege)
    this.uniteeService.listerUniteeSiege().subscribe(
      (value) => {
        this.lesUnitees = value;
      }
    );
    this.listeDesUnitees();
  }
  /**
   * LISTER QUE LES UNITEES DE TYPE NAVALE = 5
   */
  uniteesNavale() {
    // Récupération liste des unitees (Type:Navale)
    this.uniteeService.listerUniteeNavale().subscribe(
      (value) => {
        this.lesUnitees = value;
      }
    );
    this.listeDesUnitees();
  }

  listeDesUnitees() {
    this.batimentJoueurService.listerMesBatiments().subscribe(
      (mesBatiments) => {
        this.lesBatimentsDuJoueur = mesBatiments;
        this.lesUnitees.forEach(unitasse => {
          // Parcourir les bâtiments que possède le joueur
          this.lesBatimentsDuJoueur.forEach(unBatimentJoueur => {
            // Si le joueur possède le bâtiment d'où provient l'unitée, c'est ok
            if (unitasse.idBatimentProvenance == unBatimentJoueur.batiment.idTypeBatiment) {
              unitasse.flagPossedeBatimentNecessaireFormationUnitee = true;
              // Puis, vérification du niveau de bâtiment necessaire
              if (unBatimentJoueur.niveau >= unitasse.niveauBatimentNecessaireFormation) {
                unitasse.flagNiveauBatimentNecessaireFormationUniteeAssezEleve = true;
              }
              // Vérification si bâtiment pas en cours de travail
              // MAINTENANT
              var maintenant = new Date().getTime();
              if (unBatimentJoueur.dateFinConstruction > maintenant) {
                unitasse.flagBatimentUniteeEnCoursDeConstruction = true;
              }
            }
          });
        });
        this.armeeService.listerArmeesDuJoueur().subscribe(
          (armeesDuJoueur) => {
            this.armeesDuJoueur = armeesDuJoueur;
            // Parcourir les armées du joueur
            armeesDuJoueur.forEach((larmee) => {
              // Parcourir toutes les unitées qu'il existe
              this.lesUnitees.forEach(uneUnitee => {
                // Si l'unitées en cours d'analyse = Unitée de l'armée du joueur, alors, il la possède
                if (larmee.unitee.id === uneUnitee.id) {
                  uneUnitee.joueurLaPossede = true;
                  uneUnitee.quantiteePossession = larmee.quantitee;
                  this.flag = true;
                }
              });
            });
          }
        );
      }
    );
  }

}
