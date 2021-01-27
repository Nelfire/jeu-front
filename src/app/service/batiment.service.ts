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
  listerbatimentsDivers(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerbatimentsDivers`);
  }
  /**
* LISTER QUE LES BATIMENTS DE TYPE RECOLTE = 1
*/
  listerbatimentsRecolte(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerbatimentsRecolte`);
  }
  /**
 * LISTER QUE LES BATIMENTS DE TYPE STOCKAGE = 2
 */
  listerbatimentsStockage(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerbatimentsStockage`);
  }
  /**
 * LISTER QUE LES BATIMENTS DE TYPE MILLITAIRE = 3
 */
  listerbatimentsMillitaire(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerbatimentsMillitaire`);
  }
  detailsBatiment(idTypeBatiment: Number): Observable<Batiment> {
    return this.http.get<Batiment>(`${URL_BACKEND}/idTypeBatiment?idTypeBatiment=` + idTypeBatiment);
  }
}
