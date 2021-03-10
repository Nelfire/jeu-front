import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expedition } from '../models/expedition';

const URL_BACKEND = environment.baseUrl + 'expedition';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // LISTER TOUTES LES EXPEDITIONS EXISTANTES
  listerExpedition(): Observable<Expedition[]> {
    return this.http.get<Expedition[]>(`${URL_BACKEND}`);
  }

  // DETAILS D'UNE EXPEDITION (Via ID)
  detailExpedition(id: number): Observable<Expedition> {
    return this.http.get<Expedition>(`${URL_BACKEND}/detailsExpedition?id=` + id);
  }

  // EXECUTION CREATION NOUVELLES EXPEDITIONS A MINUIT
  refeshExpedition(): Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/refeshExpedition`, {});
  }
}
