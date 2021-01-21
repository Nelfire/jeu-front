import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expedition } from '../models/expedition';
import { ExpeditionJoueur } from '../models/expedition-joueur';

const URL_BACKEND = environment.baseUrl + 'expeditionJoueur';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionJoueurService {

  constructor(private http:HttpClient) { }

  listerExpeditionJoueur(): Observable<ExpeditionJoueur[]> {
    return this.http.get<ExpeditionJoueur[]>(`${URL_BACKEND}`);
  }

  envoiUniteeEnExpedition(
    idExpedition: number,
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
    ):Observable<number> {
    return this.http.post<number>(`${URL_BACKEND}`,
    {
      idExpedition: `${idExpedition}`,
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

  recupererRecompense(idExpedition: number):Observable<String> {
    return this.http.get<String>(`${URL_BACKEND}/recupererRecompense?idExpedition=`+idExpedition);
  }
}
