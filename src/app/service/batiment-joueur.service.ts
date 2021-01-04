import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Joueur } from '../auth/auth.domains';
import { Batiment } from '../models/batiment';
import { BatimentCreation } from '../models/batiment-creation';
import { MesBatiments } from '../models/mes-batiments';


const URL_BACKEND = environment.baseUrl + 'batimentsJoueur';

@Injectable({
  providedIn: 'root'
})
export class BatimentJoueurService {

  constructor(private http: HttpClient) { }

  listerMesBatiments(idJoueur: number): Observable<MesBatiments[]> {
    return this.http.get<MesBatiments[]>(`${URL_BACKEND}/idJoueur?idJoueur=` + idJoueur);
  }

  /*
  creerAmeliorerBatiment(batiment: Batiment): Observable<BatimentCreation> {

    console.log("Detail batiment : "+batiment);
    return this.http.post<BatimentCreation>(`${URL_BACKEND}`,
    {
      batiment: `${batiment}`
    });
  }
*/
  creerBatimentJoueur(idBatiment: number): Observable<BatimentCreation> {

    console.log("Detail batiment : " + idBatiment);
    return this.http.post<BatimentCreation>(`${URL_BACKEND}`,
      {
        idBatiment: `${idBatiment}`
      });
  }


}
