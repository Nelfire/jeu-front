import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'boutique';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  constructor(private http: HttpClient) { }

  achat10PourcentPierre() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentPierre`, {});
  }
  achat50PourcentPierre() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentPierre`, {});
  }
  achat100PourcentPierre() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentPierre`, {});
  }

  
  achat10PourcentBois() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentBois`, {});
  }
  achat50PourcentBois() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentBois`, {});
  }
  achat100PourcentBois() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentBois`, {});
  }

  
  achat10PourcentOr() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentOr`, {});
  }
  achat50PourcentOr() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentOr`, {});
  }
  achat100PourcentOr() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentOr`, {});
  }

  
  achat10PourcentNourriture() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentNourriture`, {});
  }
  achat50PourcentNourriture() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentNourriture`, {});
  }
  achat100PourcentNourriture() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentNourriture`, {});
  }
}
