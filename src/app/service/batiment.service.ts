import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Batiment } from '../models/batiment';

const URL_BACKEND = environment.baseUrl + 'batiment';

@Injectable({
  providedIn: 'root'
})
export class BatimentService {

  constructor(private http: HttpClient) { }

  listerBatiments(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}`);
  }

  /**
 * LISTER QUE LES BATIMENTS DE TYPE DIVERS = 0
 */
  listerBatimentsDivers(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsDivers`);
  }
  /**
* LISTER QUE LES BATIMENTS DE TYPE RECOLTE = 1
*/
  listerBatimentsRecolte(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsRecolte`);
  }
  /**
 * LISTER QUE LES BATIMENTS DE TYPE STOCKAGE = 2
 */
  listerBatimentsStockage(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsStockage`);
  }
  /**
 * LISTER QUE LES BATIMENTS DE TYPE MILLITAIRE = 3
 */
  listerBatimentsMillitaire(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsMillitaire`);
  }
  detailsBatiment(idTypeBatiment: Number): Observable<Batiment> {
    return this.http.get<Batiment>(`${URL_BACKEND}/idTypeBatiment?idTypeBatiment=` + idTypeBatiment);
  }
}
