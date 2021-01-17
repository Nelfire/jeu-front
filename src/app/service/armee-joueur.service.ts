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

  constructor(private http: HttpClient) { }
  
  produireUnitee(idUnitee: number, quantitee: number): Observable<UniteeCreation> {
    return this.http.post<UniteeCreation>(`${URL_BACKEND}`,{
      idUnitee: `${idUnitee}`,
      quantitee: `${quantitee}`
    });
  }

  // Récupération des différentes armées du joueur
  listerArmeesDuJoueur(): Observable<Armee[]> {
    return this.http.get<Armee[]>(`${URL_BACKEND}/listerArmeesDuJoueur`);
  }
}
