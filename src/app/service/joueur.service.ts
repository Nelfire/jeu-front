import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joueur } from '../auth/auth.domains';
import { environment } from 'src/environments/environment';
import {JoueurInfos} from '../models/joueur-infos';
import { Observable } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { InformationRessourcesJoueur } from '../models/informationRessourcesJoueur';
import { GainRessource } from '../models/gain-ressource';

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

  modifierInformationsJoueur(icone:string,descriptif:string): Observable<any> {
    return this.http.put<any>(`${URL_BACKEND}/modifierInformationsJoueur`, {
      icone: `${icone}`,
      descriptif: `${descriptif}`,
    })
  }

  informationRessourcesJoueur(): Observable<InformationRessourcesJoueur> {
    return this.http.get<InformationRessourcesJoueur>(`${URL_BACKEND}/informationRessourcesJoueur`)
  }

  attributionRessources(
    gainPierre: number,
    gainBois: number,
    gainOr: number,
    gainNourriture: number
  ): Observable<GainRessource> {
    return this.http.post<GainRessource>(`${URL_BACKEND}/attributionRessources`,
      {
        gainPierre: `${gainPierre}`,
        gainBois: `${gainBois}`,
        gainOr: `${gainOr}`,
        gainNourriture: `${gainNourriture}`
      });
  }

  
   // Modification joueur depuis la page d'administration
   administrationModificationJoueur(
    id : number,
    icone : string,
    pseudo : string,
    email : string,
    descriptif : string,
    niveau : number,
    experience : number,
    pierrePossession : number,
    boisPossession : number,
    orPossession : number,
    nourriturePossession : number,
    gemmePossession : number,
    pierreBoostProduction : number,
    boisBoostProduction : number,
    orBoostProduction : number,
    nourritureBoostProduction : number
  ): Observable<JoueurInfos> {
    return this.http.put<JoueurInfos>(`${URL_BACKEND}/administrationModificationJoueur?id=` + id,
      {
        id: `${id}`,
        icone : `${icone}`,
        pseudo :`${pseudo}`,
        email : `${email}`,
        descriptif : `${descriptif}`,
        niveau : `${niveau}`,
        experience : `${experience}`,
        pierrePossession : `${pierrePossession}`,
        boisPossession : `${boisPossession}`,
        orPossession : `${orPossession}`,
        nourriturePossession : `${nourriturePossession}`,
        gemmePossession : `${gemmePossession}`,
        pierreBoostProduction : `${pierreBoostProduction}`,
        boisBoostProduction : `${boisBoostProduction}`,
        orBoostProduction : `${orBoostProduction}`,
        nourritureBoostProduction : `${nourritureBoostProduction}`
      });
  }
}
