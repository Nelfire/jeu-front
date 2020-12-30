import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collegue } from '../auth/auth.domains';
import { environment } from 'src/environments/environment';
import {CollegueInfos} from '../models/collegue-infos';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.baseUrl + 'collegue';

@Injectable({
  providedIn: 'root'
})
export class CollegueService {

  // Constructeur
  constructor(private http: HttpClient) { }

  // Lister tous les collegues existant
  listerCollegues() : Observable<Collegue[]> {
    return this.http.get<Collegue[]>(`${URL_BACKEND}`);
  }

  listerInfosCollegues() {
    return this.http.get<CollegueInfos[]>(`${URL_BACKEND}/all`);
  }

  informationCollegueByEmail(email: string) {
    return this.http.get<CollegueInfos>(`${URL_BACKEND}/email?email=` + email);
  }
}
