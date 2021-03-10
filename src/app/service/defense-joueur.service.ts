import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DefenseConstruction } from '../models/defense-construction';
import { MesDefenses } from '../models/mes-defenses';
import { UniteeCreation } from '../models/unitee-creation';

const URL_BACKEND = environment.baseUrl + 'defensesJoueur';


@Injectable({
  providedIn: 'root'
})
export class DefenseJoueurService {

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // LISTER DIFFERENTES DEFENSES DU JOUEUR
  listerMesDefenses(): Observable<MesDefenses[]> {
    return this.http.get<MesDefenses[]>(`${URL_BACKEND}`);
  }

  // CREATION D'UNE DEFENSE JOUEUR (Nouvelles défense)
  construireDefense(idDefense: number, quantite: number): Observable<DefenseConstruction> {
    return this.http.post<DefenseConstruction>(`${URL_BACKEND}`, {
      idDefense: `${idDefense}`,
      quantite: `${quantite}`
    });
  }

  // ACCELERATION CONSTRUCTION DES DEFENSES (Contre gemmes)
  accelerationConstructionDefense(idDefense: number): Observable<DefenseConstruction> {
    return this.http.put<DefenseConstruction>(`${URL_BACKEND}/accelerationConstructionDefense?id=` + idDefense,
      {
        idDefense: `${idDefense}`
      });
  }
}
