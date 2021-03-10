import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'boutique';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // [Pierre] Achat 10% des réserves
  achat10PourcentPierre() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentPierre`, {});
  }
  // [Pierre] Achat 50% des réserves
  achat50PourcentPierre() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentPierre`, {});
  }
  // [Pierre] Achat 100% des réserves
  achat100PourcentPierre() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentPierre`, {});
  }

  // [Bois] Achat 10% des réserves
  achat10PourcentBois() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentBois`, {});
  }
  // [Bois] Achat 50% des réserves
  achat50PourcentBois() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentBois`, {});
  }
  // [Bois] Achat 100% des réserves
  achat100PourcentBois() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentBois`, {});
  }

  // [Or] Achat 10% des réserves
  achat10PourcentOr() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentOr`, {});
  }
  // [Or] Achat 50% des réserves
  achat50PourcentOr() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentOr`, {});
  }
  // [Or] Achat 100% des réserves
  achat100PourcentOr() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentOr`, {});
  }

  // [Nourriture] Achat 10% des réserves
  achat10PourcentNourriture() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat10PourcentNourriture`, {});
  }
  // [Nourriture] Achat 50% des réserves
  achat50PourcentNourriture() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat50PourcentNourriture`, {});
  }
  // [Nourriture] Achat 100% des réserves
  achat100PourcentNourriture() : Observable<void> {
    return this.http.post<void>(`${URL_BACKEND}/achat100PourcentNourriture`, {});
  }
}
