import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Competence } from '../models/competence';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'competences';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }

  listerCompetence(): Observable<Competence[]> {
    return this.http.get<Competence[]>(`${URL_BACKEND}`);
  }

  detailCompetence(id: Number): Observable<Competence> {
    return this.http.get<Competence>(`${URL_BACKEND}/id?id=`+id);
  }


  ajouterCompetence(adresseIcone: string, libelle: string, description: string): Observable<Competence> {
    
    return this.http.post<Competence>(`${URL_BACKEND}`,
      {
        
        adresseIcone: `${adresseIcone}`,
        libelle: `${libelle}`,
        description: `${description}`
      });
  }

  modifierCompetence(id: number, adresseIcone: string, libelle: string, description: string): Observable<Competence> {
    
    return this.http.put<Competence>(`${URL_BACKEND}/modification?id=` + id,
      {
        adresseIcone: `${adresseIcone}`,
        libelle: `${libelle}`,
        description: `${description}`
      });
  }
}
