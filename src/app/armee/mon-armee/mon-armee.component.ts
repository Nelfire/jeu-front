import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Armee } from 'src/app/models/armee';
import { Batiment } from 'src/app/models/batiment';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { Unitee } from 'src/app/models/unitee';
import { ArmeeService } from 'src/app/service/armee-joueur.service';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { GenerationRessourcesService } from 'src/app/service/generation-ressources.service';
import { JoueurService } from 'src/app/service/joueur.service';
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
  joueur: JoueurInfos;

  constructor(private uniteeService: UniteeService,
    private armeeService: ArmeeService,
    private batimentJoueurService: BatimentJoueurService,
    private joueurService: JoueurService) { }

  ngOnInit(): void {
    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;
      }
    );
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
        this.listeDesUnitees();
      }

    );

  }

  /*
   * LISTER QUE LES UNITEES DE TYPE DIVERS = 1
   */
  uniteesDivers() {
    // Récupération liste des unitees (Type:Divers)
    this.uniteeService.listerUniteeDivers().subscribe(
      (value) => {
        this.lesUnitees = value;
        this.listeDesUnitees();
      }
    );
  }
  /*
   * LISTER QUE LES UNITEES DE TYPE INFANTERIE = 2
   */
  uniteesInfanterie() {
    // Récupération liste des unitees (Type:Infanterie)
    this.uniteeService.listerUniteeInfanterie().subscribe(
      (value) => {
        this.lesUnitees = value;
        this.listeDesUnitees();
      }
    );
  }
  /*
   * LISTER QUE LES UNITEES DE TYPE CAVALERIE = 3
   */
  uniteesCavalerie() {
    // Récupération liste des unitees (Type:Cavalerie)
    this.uniteeService.listerUniteeCavalerie().subscribe(
      (value) => {
        this.lesUnitees = value;
        this.listeDesUnitees();
      }
    );
  }
  /*
   * LISTER QUE LES UNITEES DE TYPE SIEGE = 4
   */
  uniteesSiege() {
    // Récupération liste des unitees (Type:Siege)
    this.uniteeService.listerUniteeSiege().subscribe(
      (value) => {
        this.lesUnitees = value;
        this.listeDesUnitees();
      }
    );
  }
  /**
   * LISTER QUE LES UNITEES DE TYPE NAVALE = 5
   */
  uniteesNavale() {
    // Récupération liste des unitees (Type:Navale)
    this.uniteeService.listerUniteeNavale().subscribe(
      (value) => {
        this.lesUnitees = value;
        this.listeDesUnitees();
      }
    );
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
                  // vérification quantité
                  // Vérification formation en cours
                  var dateMaintenantMillisecondes = new Date().getTime();
                  if (larmee.dateFinProduction > dateMaintenantMillisecondes) {
                    uneUnitee.formationEnCours = true;
                    // formation en cours
                    let difference = (larmee.dateFinProduction - dateMaintenantMillisecondes) / 1000;
                    let uniteesEnFormation = difference / larmee.unitee.tempsFormation;
                    // Unitées totales possédées - Unitées en formation
                    uneUnitee.quantiteePossession = larmee.quantitee - Math.ceil(uniteesEnFormation);
                  } else {
                    // pas de formation en cours
                    uneUnitee.quantiteePossession = larmee.quantitee;
                  }
                  // Possède le type d'unitée : oui
                  this.flag = true;
                }
              });
            });
          }
        );
      }
    );
  }

  // Pierre
  getColorRessourceManquantePierreFormationUnite(id: number) {
    var couleur = '';
    this.lesUnitees.forEach(element => {
      if (id == element.id) {
        if (this.joueur.pierrePossession < element.coutPierreFormation) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  // Bois
  getColorRessourceManquanteBoisFormationUnite(id: number) {
    var couleur = '';
    this.lesUnitees.forEach(element => {
      if (id == element.id) {
        if (this.joueur.boisPossession < element.coutBoisFormation) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  // Or
  getColorRessourceManquanteOrFormationUnite(id: number) {
    var couleur = '';
    this.lesUnitees.forEach(element => {
      if (id == element.id) {
        if (this.joueur.orPossession < element.coutOrFormation) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  // Nourriture
  getColorRessourceManquanteNourritureFormationUnite(id: number) {
    var couleur = '';
    this.lesUnitees.forEach(element => {
      if (id == element.id) {
        if (this.joueur.nourriturePossession < element.coutNourritureFormation) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }


}
