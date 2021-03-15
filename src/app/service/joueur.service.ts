import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joueur } from '../auth/auth.domains';
import { environment } from 'src/environments/environment';
import { JoueurInfos } from '../models/joueur-infos';
import { Observable } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { InformationRessourcesJoueur } from '../models/informationRessourcesJoueur';
import { GainRessource } from '../models/gain-ressource';
import { EchangeRessource } from '../models/echange-ressource';

const URL_BACKEND = environment.baseUrl + 'joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // RECUPERER TOUS LES JOUEURS
  listerJoueurs(): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(`${URL_BACKEND}`);
  }

  // RECUPERATION DES INFORMATIONS DES JOUEURS
  listerInfosJoueurs() {
    return this.http.get<JoueurInfos[]>(`${URL_BACKEND}/all`);
  }

  // RECUPERATION INFORMATIONS JOUEUR CONNECTE
  informationJoueurByEmail() {
    return this.http.get<JoueurInfos>(`${URL_BACKEND}/infosJoueur`);
  }

  // RECUPERATION INFORMATIONS JOUEUR VIA ID (Informations Réduites)
  informationJoueurById(id: number) {
    return this.http.get<JoueurInfos>(`${URL_BACKEND}/informationJoueurById?id=` + id);
  }

  // RECUPERATION INFORMATIONS JOUEUR VIA ID  (Informations Completes)
  informationJoueurFullById(id: number) {
    return this.http.get<JoueurInfos>(`${URL_BACKEND}/informationJoueurFullById?id=` + id);
  }
  

  // MODIFICATION INFORMATIONS DU JOUEUR
  modifierInformationsJoueur(icone: string, descriptif: string): Observable<any> {
    return this.http.put<any>(`${URL_BACKEND}/modifierInformationsJoueur`, {
      icone: `${icone}`,
      descriptif: `${descriptif}`,
    })
  }

  // RECAPITULATIF DES INFORMATIONS RESSOURCE DU JOUEUR
  informationRessourcesJoueur(): Observable<InformationRessourcesJoueur> {
    return this.http.get<InformationRessourcesJoueur>(`${URL_BACKEND}/informationRessourcesJoueur`)
  }

  // ATTRIBUTION DES RESSOURCES
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

  // MODIFICATION D'UN JOUEUR (Menu administrateur, Via ID)
  administrationModificationJoueur(
    id: number,
    icone: string,
    pseudo: string,
    email: string,
    descriptif: string,
    niveau: number,
    experience: number,
    pierrePossession: number,
    boisPossession: number,
    orPossession: number,
    nourriturePossession: number,
    gemmePossession: number,
    pierreBoostProduction: number,
    boisBoostProduction: number,
    orBoostProduction: number,
    nourritureBoostProduction: number,
    donateur: Boolean,
    positionX: number,
    positionY: number
  ): Observable<JoueurInfos> {
    return this.http.put<JoueurInfos>(`${URL_BACKEND}/administrationModificationJoueur?id=` + id,
      {
        id: `${id}`,
        icone: `${icone}`,
        pseudo: `${pseudo}`,
        email: `${email}`,
        descriptif: `${descriptif}`,
        niveau: `${niveau}`,
        experience: `${experience}`,
        pierrePossession: `${pierrePossession}`,
        boisPossession: `${boisPossession}`,
        orPossession: `${orPossession}`,
        nourriturePossession: `${nourriturePossession}`,
        gemmePossession: `${gemmePossession}`,
        pierreBoostProduction: `${pierreBoostProduction}`,
        boisBoostProduction: `${boisBoostProduction}`,
        orBoostProduction: `${orBoostProduction}`,
        nourritureBoostProduction: `${nourritureBoostProduction}`,
        donateur: `${donateur}`,
        positionX: `${positionX}`,
        positionY: `${positionY}`,
      });
  }

  // ECHANGE DE RESSOURCES (Via marché)
  echangeRessource(montantPierre: number,
    montantBois: number,
    montantOr: number,
    montantNourriture: number,
    etatPierre: boolean,
    etatBois: boolean,
    etatOr: boolean,
    etatNourriture: boolean
  ): Observable<EchangeRessource> {
    return this.http.post<EchangeRessource>(`${URL_BACKEND}/echangeRessource`,
      {
        montantPierre: `${montantPierre}`,
        montantBois: `${montantBois}`,
        montantOr: `${montantOr}`,
        montantNourriture: `${montantNourriture}`,
        etatPierre: `${etatPierre}`,
        etatBois: `${etatBois}`,
        etatOr: `${etatOr}`,
        etatNourriture: `${etatNourriture}`
      });
  }
}
