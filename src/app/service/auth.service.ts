import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Joueur } from '../auth/auth.domains';

/**
 * Collègue anonyme.
 *
 */
const COLLEGUE_ANONYME = new Joueur({});

/**
 * Service de gestion de l'authentification.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Flux du collègue connecté. Les abonnés sont notifiés dès qu'une connexion ou une déconnexion a lieu.
   *
   * A l'initialisation, le collègue connecté vaut 'undefined'.
   *
   */
  private joueurConnecteSub: BehaviorSubject<Joueur> = new BehaviorSubject(COLLEGUE_ANONYME);

  constructor(private http: HttpClient) {
  }

  /**
   * Interface Observable du collègue connecté.
   *
   */
  get joueurConnecteObs(): Observable<Joueur> {
    return this.joueurConnecteSub.asObservable();
  }

  /**
   * Service permettant de vérifier si un joueur est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le collègue connecté s'il n'est pas en cache.
   *
   */
  verifierAuthentification(): Observable<Joueur> {
    return this.joueurConnecteSub.getValue().estAnonyme() ?
      this.http.get<Joueur>(`${environment.baseUrl}${environment.apiAuthMe}`, { withCredentials: true })
        .pipe(
          map(colServeur => new Joueur(colServeur)),
          tap(col => this.joueurConnecteSub.next(col)),
          catchError(err => of(COLLEGUE_ANONYME))
        ) : of(this.joueurConnecteSub.getValue())
      ;
  }

  /**
   * Connexion de l'utilisateur.
   *
   * Le serveur provoque la création du cookie AUTH-TOKEN.
   *
   */
  connecter(email: string, mdp: string): Observable<Joueur> {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(`${environment.baseUrl}${environment.apiLogin}`,
      new HttpParams().set('username', email).set('password', mdp), config)
      .pipe(
        map(colServeur => new Joueur(colServeur)),
        tap(col => this.joueurConnecteSub.next(col))
      );
  }

  /**
   * Déconnexion de l'utilisateur.
   *
   * Le serveur provoque la suppression du cookie AUTH-TOKEN.
   *
   */
  seDeconnecter() {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<Joueur>(`${environment.baseUrl}${environment.apiLogout}`, null, config)
      .pipe(
        tap(col => this.joueurConnecteSub.next(COLLEGUE_ANONYME))
      );
  }
}
