import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Joueur } from '../auth/auth.domains';
import { MesBatiments } from '../models/mes-batiments';


const URL_BACKEND = environment.baseUrl + 'batimentsJoueur';

@Injectable({
  providedIn: 'root'
})
export class BatimentJoueurService {

  constructor(private http: HttpClient) { }

  listerMesBatiments(joueur: Joueur): Observable<MesBatiments[]> {
    return this.http.get<MesBatiments[]>(`${URL_BACKEND}/joueur=`+joueur);
  }
}
