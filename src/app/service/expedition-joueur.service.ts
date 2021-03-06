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

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // LISTER TOUTES LES EXPEDITIONS DU JOUEUR, TOUT CONFONDU
  listerExpeditionJoueur(): Observable<ExpeditionJoueur[]> {
    return this.http.get<ExpeditionJoueur[]>(`${URL_BACKEND}`);
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR VICTORIEUSE + RECOMPENSE DEJA RECUPEREE = 2
  listerExpeditionJoueurTermineesVictoire(): Observable<ExpeditionJoueur[]> {
    return this.http.get<ExpeditionJoueur[]>(`${URL_BACKEND}/listerExpeditionJoueurTermineesVictoire`);
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR TERMINEES EN ECHEC = 3
  listerExpeditionJoueurTermineesEchec(): Observable<ExpeditionJoueur[]> {
    return this.http.get<ExpeditionJoueur[]>(`${URL_BACKEND}/listerExpeditionJoueurTermineesEchec`);
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR VICTORIEUSE + RECOMPENSE EN ATTENTE DE RECUPERATION = 1
  listerExpeditionJoueurRecompenseEnAttente(): Observable<ExpeditionJoueur[]> {
    return this.http.get<ExpeditionJoueur[]>(`${URL_BACKEND}/listerExpeditionJoueurRecompenseEnAttente`);
  }

  // LISTER UNIQUEMENT LES EXPEDITIONS JOUEUR EN COURS = 0
  listerExpeditionJoueurEnCours(): Observable<ExpeditionJoueur[]> {
    return this.http.get<ExpeditionJoueur[]>(`${URL_BACKEND}/listerExpeditionJoueurEnCours`);
  }

  // ENVOI D'UNITEES EN EXPEDITION (Création)
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
  ): Observable<number> {
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

  // RECUPERATION DE LA RECOMPENSE D'EXPEDITION
  recupererRecompense(idExpedition: number): Observable<String> {
    return this.http.get<String>(`${URL_BACKEND}/recupererRecompense?idExpedition=` + idExpedition);
  }
}
