import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Armee } from '../models/armee';
import { Unitee } from '../models/unitee';
import { UniteeCreation } from '../models/unitee-creation';

const URL_BACKEND = environment.baseUrl + 'armee';

@Injectable({
  providedIn: 'root'
})
export class ArmeeService {

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // CREATION ARMEE DU JOUEUR (Nouvelles unitées)
  produireUnitee(idUnitee: number, quantitee: number): Observable<UniteeCreation> {
    return this.http.post<UniteeCreation>(`${URL_BACKEND}`, {
      idUnitee: `${idUnitee}`,
      quantitee: `${quantitee}`
    });
  }

  // LISTER LES ARMEES DU JOUEURS
  listerArmeesDuJoueur(): Observable<Armee[]> {
    return this.http.get<Armee[]>(`${URL_BACKEND}/listerArmeesDuJoueur`);
  }

  // ACCELERATION FORMATION DES UNITES (Contre gemmes)
  accelerationFormationUnite(idUnite: number): Observable<UniteeCreation> {
    return this.http.put<UniteeCreation>(`${URL_BACKEND}/accelerationFormationUnite?id=` + idUnite,
      {
        idUnite: `${idUnite}`
      });
  }
}
