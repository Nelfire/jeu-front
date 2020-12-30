
import {HttpClient} from '@angular/common/http';
import {Observable, merge, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {flatMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { BackendLink, Actuator } from '../tech/tech.domains';

/**
 * Service donnant accès aux informations techniques.
 */
@Injectable({
  providedIn: 'root'
})
export class TechService {

  constructor(private http: HttpClient) { }

  /**
   * Récupération d'un flux de liens techniques vers le backend
   */
  listBackendLinks(): Observable<BackendLink> {
    return merge(this.http.get(`${environment.baseUrl}${environment.apiActuator}`)
      .pipe(
        flatMap((actuatorData: Actuator) => Object.entries(actuatorData._links)
            .map((entry: [string, any]) => new BackendLink({name: entry[0], href: entry[1].href}))
        )
      ), of(new BackendLink({name: 'versions', href: `${environment.baseUrl}${environment.apiVersion}`})))
      ;
  }

}
