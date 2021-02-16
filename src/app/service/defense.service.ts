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

  constructor(private http: HttpClient) { }

  /*
   * LISTE LES DIFFERENTS TYPES DE DEFENSE
   */
  listerDefense(): Observable<Defense[]> {
    return this.http.get<Defense[]>(`${URL_BACKEND}/listerDefense`);
  }

  /*
  * LISTER QUE LES DEFENSES DE TYPE OFFENSIVE = 1
  */
  listerDefensesOffensive(): Observable<Defense[]> {
    return this.http.get<Defense[]>(`${URL_BACKEND}/listerDefensesOffensive`);
  }

  /*
  * LISTER QUE LES DEFENSES DE TYPE DEFENSIVE = 2
  */
  listerDefensesDefensive(): Observable<Defense[]> {
    return this.http.get<Defense[]>(`${URL_BACKEND}/listerDefensesDefensive`);
  }

  detailsDefense(id: number): Observable<Defense> {
    return this.http.get<Defense>(`${URL_BACKEND}/detailsDefense?id=` + id);
  }

  // Modification défense depuis la page d'administration
  administrationModificationDefense(
    id: number,
    idTypeDefense: number,
    typeDefense: number,
    icone: string,
    libelle: string,
    description: string,
    coutPierreConstruction: number,
    coutBoisConstruction: number,
    coutOrConstruction: number,
    coutNourritureConstruction: number,
    vie: number,
    attaque: number,
    bouclier: number,
    tempsConstruction: number,
    niveauBatimentNecessaireConstruction: number,
    idBatimentProvenance: number
  ): Observable<Defense> {
    return this.http.put<Defense>(`${URL_BACKEND}/modificationDefense?id=` + id,
      {
        id: `${id}`,
        idTypeDefense: `${idTypeDefense}`,
        typeDefense: `${typeDefense}`,
        icone: `${icone}`,
        libelle: `${libelle}`,
        description: `${description}`,
        coutPierreConstruction: `${coutPierreConstruction}`,
        coutBoisConstruction: `${coutBoisConstruction}`,
        coutOrConstruction: `${coutOrConstruction}`,
        coutNourritureConstruction: `${coutNourritureConstruction}`,
        vie: `${vie}`,
        attaque: `${attaque}`,
        bouclier: `${bouclier}`,
        tempsConstruction: `${tempsConstruction}`,
        niveauBatimentNecessaireConstruction: `${niveauBatimentNecessaireConstruction}`,
        idBatimentProvenance: `${idBatimentProvenance}`
      });
  }
}
