import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpeditionJoueur } from '../models/expedition-joueur';

const URL_BACKEND = environment.baseUrl + 'expeditionJoueur';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionJoueurService {

  constructor(private http:HttpClient) { }

  listerExpeditionJoueur(): Observable<ExpeditionJoueur[]> {
    return this.http.get<ExpeditionJoueur[]>(`${URL_BACKEND}`);
  }
}
