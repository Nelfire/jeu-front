import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MesDefenses } from '../models/mes-defenses';

const URL_BACKEND = environment.baseUrl + 'defensesJoueur';


@Injectable({
  providedIn: 'root'
})
export class DefenseJoueurService {

  constructor(private http: HttpClient) { }

  listerMesDefenses(): Observable<MesDefenses[]> {
    return this.http.get<MesDefenses[]>(`${URL_BACKEND}`);
  }
}
