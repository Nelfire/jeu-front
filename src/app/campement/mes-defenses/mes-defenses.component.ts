import { Component, OnInit } from '@angular/core';
import { MesBatiments } from 'src/app/models/mes-batiments';
import { MesDefenses } from 'src/app/models/mes-defenses';
import { DefenseJoueurService } from 'src/app/service/defense-joueur.service';
import { DefenseService } from 'src/app/service/defense.service';

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

  // CONSTRUCTEUR
  constructor(private defenseService: DefenseService,
    private defenseJoueurService: DefenseJoueurService) { }

  //ngOnInit
  ngOnInit(): void {
    this.defenseService.listerDefense().subscribe(
      (defenses) => {
        this.lesDefenses = defenses;
        this.defenseJoueurService.listerMesDefenses().subscribe(
          (mesDefenses) => {
            // PARCOURS DE TOUTES LES DEFENSES QUE POSSEDE LE JOUEUR
            mesDefenses.forEach((maDefense) => {

              // PARCOURS DE TOUTES LES DEFENSES EXISTANTES
              this.lesDefenses.forEach(uneDefense => {
                // Si l'id de la défense en cours d'analyse = a l'id de la défense du joueur , alors je considère qu'il le possède

                if (maDefense.id === uneDefense.idTypeDefense) {
                  uneDefense.joueurLePossede = true;
                  uneDefense.dateFinConstruction = maDefense.dateFinConstruction;

                  var dateMaintenantMillisecondes = new Date().getTime();



                  if (dateMaintenantMillisecondes < uneDefense.dateFinConstruction) {
                    uneDefense.flagEnCoursDeTravail = true;
                    // construction en cours
                    let difference = (uneDefense.dateFinProduction - dateMaintenantMillisecondes) / 1000;
                    let defensesEnFormation = difference / uneDefense.tempsConstruction;
                    // Unitées totales possédées - Unitées en formation
                    uneDefense.quantiteePossession = maDefense.quantite - Math.ceil(defensesEnFormation);
                  } else {
                    // pas de formation en cours
                    uneDefense.quantiteePossession = uneDefense.quantite;
                  }




                }

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
            });




          }
        );
      }
    );
  }

}
