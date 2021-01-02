import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Joueur } from '../auth/auth.domains';
import { Batiment } from '../models/batiment';
import { MesBatiments } from '../models/mes-batiments';


const URL_BACKEND = environment.baseUrl + 'batimentsJoueur';

@Injectable({
  providedIn: 'root'
})
export class BatimentJoueurService {

  constructor(private http: HttpClient) { }

  listerMesBatiments(idJoueur: number): Observable<MesBatiments[]> {
    return this.http.get<MesBatiments[]>(`${URL_BACKEND}/idJoueur?idJoueur=`+idJoueur);
  }

  creerBatiment(idTypeBatiment: number, idJoueur: number) {
    return this.http.post(`${URL_BACKEND}`,
    {
      idTypeBatiment: `${idTypeBatiment}`,
      idJoueur: `${idJoueur}`
    });
  }

  
}
