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

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // Recherche la population maximale du joueur (Recherche du bâtiment chaumiere, hdv)
  populationJoueur(): Observable<Number> {
    return this.http.get<Number>(`${URL_BACKEND}/popultationMaximale`);
  }

  // LISTAGE DE TOUS LES BATIMENTS QUE POSSEDE LE JOUEUR
  listerMesBatiments(): Observable<MesBatiments[]> {
    return this.http.get<MesBatiments[]>(`${URL_BACKEND}`);
  }

  // DETAILS D'UN BATIMENT JOUEUR (Via ID)
  rechercheBatimentJoueur(idTypeBatiment: number): Observable<MesBatiments> {
    return this.http.get<MesBatiments>(`${URL_BACKEND}/idTypeBatiment?idTypeBatiment=` + idTypeBatiment);
  }

  // CREATION D'UN NOUVEAU BATIMENT JOUEUR (Construction)
  creerBatimentJoueur(idBatiment: number): Observable<BatimentCreation> {
    return this.http.post<BatimentCreation>(`${URL_BACKEND}`,
      {
        idBatiment: `${idBatiment}`
      });
  }

  // MODIFICATION D'UN BATIMENT JOUEUR (Amélioration)
  ameliorerBatimentJoueur(idBatimentJoueur: number): Observable<BatimentAmelioration> {
    return this.http.put<BatimentAmelioration>(`${URL_BACKEND}/modification?id=` + idBatimentJoueur,
      {
        idBatimentJoueur: `${idBatimentJoueur}`
      });
  }

  // ACCELERATION CONSTRUCTION D'UN BATIMENT JOUEUR (Contre gemmes)
  accelerationConstructionBatiment(idBatimentJoueur: number): Observable<BatimentAmelioration> {
    return this.http.put<BatimentAmelioration>(`${URL_BACKEND}/accelerationConstructionBatiment?id=` + idBatimentJoueur,
      {
        idBatimentJoueur: `${idBatimentJoueur}`
      });
  }
}
