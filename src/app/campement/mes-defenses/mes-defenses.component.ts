import { Component, OnInit } from '@angular/core';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { MesDefenses } from 'src/app/models/mes-defenses';
import { BatimentJoueurService } from 'src/app/service/batiment-joueur.service';
import { DefenseJoueurService } from 'src/app/service/defense-joueur.service';
import { DefenseService } from 'src/app/service/defense.service';
import { JoueurService } from 'src/app/service/joueur.service';

@Component({
  selector: 'app-mes-defenses',
  templateUrl: './mes-defenses.component.html',
  styleUrls: ['./mes-defenses.component.scss']
})
export class MesDefensesComponent implements OnInit {

  // INITIALISATIONS
  lesDefenses = [];
  lesDefensesDuJoueur: MesDefenses[];
  lesBatimentsDuJoueur: MesBatiments[];
  joueur: JoueurInfos;

  // CONSTRUCTEUR
  constructor(private defenseService: DefenseService,
    private defenseJoueurService: DefenseJoueurService,
    private batimentJoueurService: BatimentJoueurService,
    private joueurService: JoueurService) { }

  //ngOnInit
  ngOnInit(): void {
    // Récupération des informations du joueur, pour indiquer le manque de ressources (colorisation)
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.joueur = value;
      }
    );
    // Récupération liste de toutes les défenses existants
    this.defensesToutes();
  }

  listeDesDefenses() {
    this.batimentJoueurService.listerMesBatiments().subscribe(
      (mesBatiments) => {
        this.lesBatimentsDuJoueur = mesBatiments;
        this.lesDefenses.forEach(uneDefense => {
          // Parcourir les bâtiments que possède le joueur
          this.lesBatimentsDuJoueur.forEach(unBatimentJoueur => {

            // Si le joueur possède le bâtiment d'où provient l'unitée, c'est ok
            if (uneDefense.idBatimentProvenance == unBatimentJoueur.batiment.idTypeBatiment) {
              uneDefense.flagPossedeBatimentNecessaireConstructionDefense = true;
              // Puis, vérification du niveau de bâtiment necessaire
              if (unBatimentJoueur.niveau >= uneDefense.niveauBatimentNecessaireConstruction) {
                uneDefense.flagNiveauBatimentNecessaireConstructionDefenseAssezEleve = true;
              }
              // Vérification si bâtiment pas en cours de travail
              // MAINTENANT
              var maintenant = new Date().getTime();
              if (unBatimentJoueur.dateFinConstruction > maintenant) {
                uneDefense.flagBatimentDefenseEnCoursDeConstruction = true;
              }
            }
          });
        });

        this.defenseJoueurService.listerMesDefenses().subscribe(
          (lesDefensesDuJoueur) => {
            this.lesDefensesDuJoueur = lesDefensesDuJoueur;
            // Parcourir les armées du joueur
            lesDefensesDuJoueur.forEach((maDefense) => {
              // Parcourir toutes les unitées qu'il existe
              this.lesDefenses.forEach(uneDefense => {
                // Si l'unitées en cours d'analyse = Unitée de l'armée du joueur, alors, il la possède
                if (maDefense.defense.idTypeDefense === uneDefense.idTypeDefense) {

                  uneDefense.joueurLaPossede = true;
                  // vérification quantité
                  // Vérification formation en cours
                  var dateMaintenantMillisecondes = new Date().getTime();
                  if (maDefense.dateFinConstruction > dateMaintenantMillisecondes) {
                    uneDefense.constructionEnCours = true;
                    // formation en cours
                    let difference = (maDefense.dateFinConstruction - dateMaintenantMillisecondes) / 1000;
                    let defensesEnCoursConstruction = difference / uneDefense.tempsConstruction;
                    // Unitées totales possédées - Unitées en formation
                    uneDefense.quantiteePossession = maDefense.quantite - Math.ceil(defensesEnCoursConstruction);
                  } else {
                    // pas de formation en cours
                    uneDefense.quantiteePossession = maDefense.quantite;
                  }
                }
              });
            });
          }
        );
      }
    );
  }

  defensesToutes() {
    this.defenseService.listerDefense().subscribe(
      (defenses) => {
        this.lesDefenses = defenses;
        this.listeDesDefenses();
      }
    );
  }

  defensesOffensive() {
    this.defenseService.listerDefensesOffensive().subscribe(
      (defenses) => {
        this.lesDefenses = defenses;
        this.listeDesDefenses();
      }
    );
  }

  defensesDefensive() {
    this.defenseService.listerDefensesDefensive().subscribe(
      (defenses) => {
        this.lesDefenses = defenses;
        this.listeDesDefenses();
      }
    );
  }

  // Pierre
  getColorRessourceManquantePierreConstructionDefense(id: number) {
    var couleur = '';
    this.lesDefenses.forEach(element => {
      if (id == element.id) {
        if (this.joueur.pierrePossession < element.coutPierreConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  // Bois
  getColorRessourceManquanteBoisConstructionDefense(id: number) {
    var couleur = '';
    this.lesDefenses.forEach(element => {
      if (id == element.id) {
        if (this.joueur.boisPossession < element.coutBoisConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  // Or
  getColorRessourceManquanteOrConstructionDefense(id: number) {
    var couleur = '';
    this.lesDefenses.forEach(element => {
      if (id == element.id) {
        if (this.joueur.orPossession < element.coutOrConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }
  // Nourriture
  getColorRessourceManquanteNourritureConstructionDefense(id: number) {
    var couleur = '';
    this.lesDefenses.forEach(element => {
      if (id == element.id) {
        if (this.joueur.nourriturePossession < element.coutNourritureConstruction) {
          couleur = 'red';
        } else {
          couleur = 'green';
        }
      }
    });
    return couleur;
  }

}
