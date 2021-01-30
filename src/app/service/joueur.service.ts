import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joueur } from '../auth/auth.domains';
import { environment } from 'src/environments/environment';
import {JoueurInfos} from '../models/joueur-infos';
import { Observable } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

const URL_BACKEND = environment.baseUrl + 'joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  // Constructeur
  constructor(private http: HttpClient) { }

  // Lister tous les joueurs existant
  listerJoueurs() : Observable<Joueur[]> {
    return this.http.get<Joueur[]>(`${URL_BACKEND}`);
  }

  listerInfosJoueurs() {
    return this.http.get<JoueurInfos[]>(`${URL_BACKEND}/all`);
  }

  informationJoueurByEmail() {
    return this.http.get<JoueurInfos>(`${URL_BACKEND}/infosJoueur`);
  }
  informationJoueurById(id:number) {
    return this.http.get<JoueurInfos>(`${URL_BACKEND}/informationJoueurById?id=`+id);
  }

  modifierInformationsJoueur(icone:string,email:string,descriptif:string): Observable<any> {
    return this.http.put<any>(`${URL_BACKEND}/modifierInformationsJoueur`, {
      icone: `${icone}`,
      email: `${email}`,
      descriptif: `${descriptif}`,
    })
  }
}
