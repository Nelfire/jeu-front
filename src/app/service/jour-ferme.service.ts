import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { TypeJourFerme } from '../models/type-jour-ferme';
import { JourFermeVisualisation } from '../models/jour-ferme-visualisation';
import { JourFermeVisuPlanning } from '../models/jour-ferme-visu-planning';
import { JourFermeAjout } from '../models/jour-ferme-ajout';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'jourFerme';
@Injectable({
  providedIn: 'root'
})
export class JourFermeService {

  // Constructeur
  constructor(private http: HttpClient) { }

  // Lister tous les jours fermes
  listerJourFerme() {
    return this.http.get<JourFermeVisualisation[]>(`${URL_BACKEND}`);
  }

  // Lister tous les jours fermes planning
  listerJourFermePlanning() {
    return this.http.get<JourFermeVisuPlanning[]>(`${URL_BACKEND}`);
  }

  // Lister tous les jours fermes, filtre par ann�es
  listerJourFermeParAnnee(annee: number) {
    return this.http.get<JourFermeVisualisation[]>(`${URL_BACKEND}/date?annee=` + annee);
  }

  // R�cup�rer donn�es d'un jour ferm�, VIA ID
  getJourFermeParId(id: number) {
    return this.http.get<JourFermeVisualisation>(`${URL_BACKEND}/id?id=` + id);
  }

  // Ajouter un jour ferm�
  ajouterJourFerme(date: Date, type: TypeJourFerme, commentaire: string): Observable<JourFermeAjout> {
    return this.http.post<JourFermeAjout>(`${URL_BACKEND}`,
      {
        date: `${date}`,
        type: `${type}`,
        commentaire: `${commentaire}`
      });
  }

  // Modifier un jour ferm�
  modifierJourFerme(id: number, date: Date, type: TypeJourFerme, commentaire: string): Observable<JourFermeVisualisation> {
    return this.http.put<JourFermeVisualisation>(`${URL_BACKEND}/modification?id=` + id,
      {
        date: `${date}`,
        type: `${type}`,
        commentaire: `${commentaire}`
      });
  }

  // Supprimer un jour ferm�
  suppressionJourFerme(id: number): Observable<JourFermeVisualisation> {
    return this.http.delete<JourFermeVisualisation>(`${URL_BACKEND}/delete?id=${id}`);
  }

}
