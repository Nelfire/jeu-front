import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CampagneJoueur } from 'src/app/models/campagne-joueur';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'campagneJoueur';

@Injectable({
  providedIn: 'root'
})
export class CampagneJoueurService {

  constructor(private http: HttpClient) { }


  // LISTER TOUTES LES EXPEDITIONS DU JOUEUR, TOUT CONFONDU
  listerCampagneJoueur(): Observable<CampagneJoueur[]> {
    return this.http.get<CampagneJoueur[]>(`${URL_BACKEND}`);
  }



  envoiUniteeEnCampagne(
    idCampagne: number,
    nombreVillageois: number,
    nombreArcher: number,
    nombreArcherComposite: number,
    nombreFantassinEpee: number,
    nombreHommeDArme: number,
    nombreLanceurDeHache: number,
    nombreMilicien: number,
    nombrePiquier: number,
    nombreCavalierArcher: number,
    nombreCavalier: number,
    nombreChampion: number,
    nombreBateauDePeche: number,
    nombreBateauIncendiaire: number,
    nombreBateauDeDestruction: number,
    nombreGalionACanon: number,
    nombreGalion: number,
    nombreGuerrierElite: number,
    nombrePhalange: number,
    nombreSamourail: number,
    nombreTemplier: number,
    nombreCatapulte: number,
    nombreElephantDeCombat: number,
    nombrePretre: number
  ): Observable<number> {
    return this.http.post<number>(`${URL_BACKEND}`,
      {
        idCampagne: `${idCampagne}`,
        nombreVillageois: `${nombreVillageois}`,
        nombreArcher: `${nombreArcher}`,
        nombreArcherComposite: `${nombreArcherComposite}`,
        nombreFantassinEpee: `${nombreFantassinEpee}`,
        nombreHommeDArme: `${nombreHommeDArme}`,
        nombreLanceurDeHache: `${nombreLanceurDeHache}`,
        nombreMilicien: `${nombreMilicien}`,
        nombrePiquier: `${nombrePiquier}`,
        nombreCavalierArcher: `${nombreCavalierArcher}`,
        nombreCavalier: `${nombreCavalier}`,
        nombreChampion: `${nombreChampion}`,
        nombreBateauDePeche: `${nombreBateauDePeche}`,
        nombreBateauIncendiaire: `${nombreBateauIncendiaire}`,
        nombreBateauDeDestruction: `${nombreBateauDeDestruction}`,
        nombreGalionACanon: `${nombreGalionACanon}`,
        nombreGalion: `${nombreGalion}`,
        nombreGuerrierElite: `${nombreGuerrierElite}`,
        nombrePhalange: `${nombrePhalange}`,
        nombreSamourail: `${nombreSamourail}`,
        nombreTemplier: `${nombreTemplier}`,
        nombreCatapulte: `${nombreCatapulte}`,
        nombreElephantDeCombat: `${nombreElephantDeCombat}`,
        nombrePretre: `${nombrePretre}`
      });
  }

  recupererRecompense(idCampagne: number): Observable<String> {
    return this.http.get<String>(`${URL_BACKEND}/recupererRecompense?idCampagne=` + idCampagne);
  }
}
