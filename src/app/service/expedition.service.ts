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

  constructor(private http:HttpClient) { }

  listerExpedition(): Observable<Expedition[]> {
    return this.http.get<Expedition[]>(`${URL_BACKEND}`);
  }

  detailExpedition(id: number): Observable<Expedition> {
    return this.http.get<Expedition>(`${URL_BACKEND}/detailsExpedition?id=`+id);
  }
}
