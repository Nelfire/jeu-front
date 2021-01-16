import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unitee } from '../models/unitee';

const URL_BACKEND = environment.baseUrl + 'unitee';

@Injectable({
  providedIn: 'root'
})
export class UniteeService {

  constructor(private http: HttpClient) { }

  // Création de nouveau type d'unitées depuis la page d'administration
  administrationCreationUnitee(idTypeUnitee:number,idBatimentProvenance:number,icone:string,libelle:string,descriptif:string,coutPierreFormation:number,coutBoisFormation:number,coutOrFormation:number,coutNourritureFormation:number,
    coutHumain:number,tempsFormation:number,vie:number,attaque:number,portee:number,armure:number,niveauBatimentNecessaireFormation:number,apportRessourcePierreHeure:number,apportRessourceBoisHeure:number,
    apportRessourceOrHeure:number,apportRessourceNourritureHeure:number): Observable<Unitee> {
    return this.http.post<Unitee>(`${URL_BACKEND}`, 
    {
      idTypeUnitee: `${idTypeUnitee}`,
      idBatimentProvenance: `${idBatimentProvenance}`,
      icone: `${icone}`,
      libelle: `${libelle}`,
      descriptif: `${descriptif}`,
      coutPierreFormation: `${coutPierreFormation}`,
      coutBoisFormation: `${coutBoisFormation}`,
      coutOrFormation: `${coutOrFormation}`,
      coutNourritureFormation: `${coutNourritureFormation}`,
      coutHumain: `${coutHumain}`,
      tempsFormation: `${tempsFormation}`,
      vie: `${vie}`,
      attaque: `${attaque}`,
      portee: `${portee}`,
      armure: `${armure}`,
      niveauBatimentNecessaireFormation: `${niveauBatimentNecessaireFormation}`,
      apportRessourcePierreHeure: `${apportRessourcePierreHeure}`,
      apportRessourceBoisHeure: `${apportRessourceBoisHeure}`,
      apportRessourceOrHeure: `${apportRessourceOrHeure}`,
      apportRessourceNourritureHeure: `${apportRessourceNourritureHeure}`
    });
  }

   // Création de nouveau type d'unitées depuis la page d'administration
   administrationModificationUnitee(id:number,idTypeUnitee:number,idBatimentProvenance:number,icone:string,libelle:string,descriptif:string,coutPierreFormation:number,coutBoisFormation:number,coutOrFormation:number,coutNourritureFormation:number,
    coutHumain:number,tempsFormation:number,vie:number,attaque:number,portee:number,armure:number,niveauBatimentNecessaireFormation:number,apportRessourcePierreHeure:number,apportRessourceBoisHeure:number,
    apportRessourceOrHeure:number,apportRessourceNourritureHeure:number): Observable<Unitee> {
    return this.http.put<Unitee>(`${URL_BACKEND}/modificationUnitee?id=`+id, 
    {
      id:`${id}`,
      idTypeUnitee: `${idTypeUnitee}`,
      idBatimentProvenance: `${idBatimentProvenance}`,
      icone: `${icone}`,
      libelle: `${libelle}`,
      descriptif: `${descriptif}`,
      coutPierreFormation: `${coutPierreFormation}`,
      coutBoisFormation: `${coutBoisFormation}`,
      coutOrFormation: `${coutOrFormation}`,
      coutNourritureFormation: `${coutNourritureFormation}`,
      coutHumain: `${coutHumain}`,
      tempsFormation: `${tempsFormation}`,
      vie: `${vie}`,
      attaque: `${attaque}`,
      portee: `${portee}`,
      armure: `${armure}`,
      niveauBatimentNecessaireFormation: `${niveauBatimentNecessaireFormation}`,
      apportRessourcePierreHeure: `${apportRessourcePierreHeure}`,
      apportRessourceBoisHeure: `${apportRessourceBoisHeure}`,
      apportRessourceOrHeure: `${apportRessourceOrHeure}`,
      apportRessourceNourritureHeure: `${apportRessourceNourritureHeure}`
    });
  }

  listerDifferentesUnitees(): Observable<Unitee[]> {
    return this.http.get<Unitee[]>(`${URL_BACKEND}`);
  }
  detailsUnitee(id: number): Observable<Unitee> {
    return this.http.get<Unitee>(`${URL_BACKEND}/detailsUnitee?id=`+id);
  }

}
