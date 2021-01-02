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
  
  detailsBatiment(idTypeBatiment: Number): Observable<Batiment> {
    return this.http.get<Batiment>(`${URL_BACKEND}/idTypeBatiment?idTypeBatiment=`+idTypeBatiment);
  }
}
