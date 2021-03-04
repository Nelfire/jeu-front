import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campagne } from 'src/app/models/campagne';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'campagne';


@Injectable({
  providedIn: 'root'
})
export class CampagneService {

  constructor(private http: HttpClient) { }

  /**
* LISTER TOUTES LES CAMPAGNES QU'IL EXISTE
*/
  listerLesCampagnes(): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${URL_BACKEND}`);
  }
}
