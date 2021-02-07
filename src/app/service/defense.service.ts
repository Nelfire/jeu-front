import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Defense } from '../models/defense';

const URL_BACKEND = environment.baseUrl + 'defense';


@Injectable({
  providedIn: 'root'
})
export class DefenseService {

  constructor(private http:HttpClient) { }

  /*
	 * LISTE LES DIFFERENTS TYPES DE DEFENSE
	 */
  listerDefense(): Observable<Defense[]> {
    return this.http.get<Defense[]>(`${URL_BACKEND}/listerDefense`);
  }
}
