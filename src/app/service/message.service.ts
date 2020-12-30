import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { TypeJourFerme } from '../models/type-jour-ferme';
import { JourFermeVisualisation } from '../models/jour-ferme-visualisation';
import { JourFermeVisuPlanning } from '../models/jour-ferme-visu-planning';
import { JourFermeAjout } from '../models/jour-ferme-ajout';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Message } from '../models/message';

const URL_BACKEND = environment.baseUrl + 'messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  listerMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(`${URL_BACKEND}`);
  }

  ajouterMessage(datePublication: Date, emailCollegue: string, contenu: string): Observable<Message> {
    console.log(datePublication); // Donnée correctement récupérée
    console.log(emailCollegue); // Donnée correctement récupérée
    console.log(contenu); // Donnée correctement récupérée
    
    return this.http.post<Message>(`${URL_BACKEND}`,
      {
        datePublication: `${datePublication}`,
        emailCollegue: `${emailCollegue}`,
        contenu: `${contenu}`
      });
  }
  



}
