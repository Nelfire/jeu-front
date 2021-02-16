import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Batiment } from '../models/batiment';

const URL_BACKEND = environment.baseUrl + 'batiment';

@Injectable({
  providedIn: 'root'
})
export class BatimentService {

  constructor(private http: HttpClient) { }

  listerBatiments(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}`);
  }

  /**
 * LISTER QUE LES BATIMENTS DE TYPE DIVERS = 0
 */
  listerBatimentsDivers(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsDivers`);
  }
  /**
* LISTER QUE LES BATIMENTS DE TYPE RECOLTE = 1
*/
  listerBatimentsRecolte(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsRecolte`);
  }
  /**
 * LISTER QUE LES BATIMENTS DE TYPE STOCKAGE = 2
 */
  listerBatimentsStockage(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsStockage`);
  }
  /**
 * LISTER QUE LES BATIMENTS DE TYPE MILLITAIRE = 3
 */
  listerBatimentsMillitaire(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${URL_BACKEND}/listerBatimentsMillitaire`);
  }

  detailsBatiment(idTypeBatiment: Number): Observable<Batiment> {
    return this.http.get<Batiment>(`${URL_BACKEND}/idTypeBatiment?idTypeBatiment=` + idTypeBatiment);
  }

  // Modification bâtiment depuis la page d'administration
  administrationModificationBatiment(
    id: number,
    idTypeBatiment: number,
    idCategorieBatiment: number,
    icone: string,
    libelle: string,
    descriptif: string,
    ouvrierNecessaireConstruction: number,
    tempsDeConstruction: number,
    coutPierreConstruction: number,
    coutBoisConstruction: number,
    coutOrConstruction: number,
    coutNourritureConstruction: number,
    niveauHotelDeVilleNecessaireConstruction: number,
    quantiteeStockagePierre: number,
    quantiteeStockageBois: number,
    quantiteeStockageOre: number,
    quantiteeStockageNourriture: number,
    apportPierreHeure: number,
    apportBoisHeure: number,
    apportOreHeure: number,
    apportNourritureHeure: number
  ): Observable<Batiment> {
    return this.http.put<Batiment>(`${URL_BACKEND}/modificationBatiment?id=` + id,
      {
        id: `${id}`,
        idTypeBatiment: `${idTypeBatiment}`,
        idCategorieBatiment: `${idCategorieBatiment}`,
        icone: `${icone}`,
        libelle: `${libelle}`,
        descriptif: `${descriptif}`,
        ouvrierNecessaireConstruction: `${ouvrierNecessaireConstruction}`,
        tempsDeConstruction: `${tempsDeConstruction}`,
        coutPierreConstruction: `${coutPierreConstruction}`,
        coutBoisConstruction: `${coutBoisConstruction}`,
        coutOrConstruction: `${coutOrConstruction}`,
        coutNourritureConstruction: `${coutNourritureConstruction}`,
        niveauHotelDeVilleNecessaireConstruction: `${niveauHotelDeVilleNecessaireConstruction}`,
        quantiteeStockagePierre: `${quantiteeStockagePierre}`,
        quantiteeStockageBois: `${quantiteeStockageBois}`,
        quantiteeStockageOre: `${quantiteeStockageOre}`,
        quantiteeStockageNourriture: `${quantiteeStockageNourriture}`,
        apportPierreHeure: `${apportPierreHeure}`,
        apportBoisHeure: `${apportBoisHeure}`,
        apportOreHeure: `${apportOreHeure}`,
        apportNourritureHeure: `${apportNourritureHeure}`
      });
  }


}
