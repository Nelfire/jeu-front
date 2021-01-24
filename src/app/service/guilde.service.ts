import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreationGuilde } from '../models/creation-guilde';
import { Guilde } from '../models/guilde';

const URL_BACKEND = environment.baseUrl + 'guilde';

@Injectable({
  providedIn: 'root'
})
export class GuildeService {

  constructor(private http: HttpClient) { }

  // lister toutes les guildes
  listerGuildes () : Observable<Guilde[]> {
    return this.http.get<Guilde[]>(`${URL_BACKEND}/listerGuildes`);
  }

  creerGuilde(icone: number, libelle: number) : Observable<CreationGuilde> {
    return this.http.post<CreationGuilde>(`${URL_BACKEND}`,
    {
      icone: `${icone}`,
      libelle: `${libelle}`
    })
    
  }
}
