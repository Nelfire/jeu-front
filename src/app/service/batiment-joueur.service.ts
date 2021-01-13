import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Joueur } from '../auth/auth.domains';
import { Batiment } from '../models/batiment';
import { BatimentAmelioration } from '../models/batiment-amelioration';
import { BatimentCreation } from '../models/batiment-creation';
import { MesBatiments } from '../models/mes-batiments';

// Initialisation constante URL
const URL_BACKEND = environment.baseUrl + 'batimentsJoueur';

@Injectable({
  providedIn: 'root'
})
export class BatimentJoueurService {

  constructor(private http: HttpClient) { }

  // Recherche la population maximale du joueur (Recherche du bâtiment chaumiere)
  populationJoueur():Observable<Number> {
    return this.http.get<Number>(`${URL_BACKEND}/popultationMaximale`);
  }

  // Lister les bâtiments que possède le joueur
  listerMesBatiments(idJoueur: number): Observable<MesBatiments[]> {
    return this.http.get<MesBatiments[]>(`${URL_BACKEND}/idJoueur?idJoueur=` + idJoueur);
  }

  // Recherche d'un batiment joueur spécifique
  rechercheBatimentJoueur(idTypeBatiment: number): Observable<MesBatiments> {
    return this.http.get<MesBatiments>(`${URL_BACKEND}/idTypeBatiment?idTypeBatiment=` + idTypeBatiment);
  }

  // Création d'une ligne "BatimentJoueur"
  creerBatimentJoueur(idBatiment: number): Observable<BatimentCreation> {
    return this.http.post<BatimentCreation>(`${URL_BACKEND}`,
      {
        idBatiment: `${idBatiment}`
      });
  }

  // Création d'une ligne "BatimentJoueur"
  ameliorerBatimentJoueur(idBatimentJoueur: number): Observable<BatimentAmelioration> {
    console.log("Id du batiment qui va être amélioré : "+idBatimentJoueur);
    return this.http.put<BatimentAmelioration>(`${URL_BACKEND}/modification?id=` + idBatimentJoueur,
      {
        idBatimentJoueur: `${idBatimentJoueur}`
      });
  }
}
