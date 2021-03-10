import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';

const URL_BACKEND = environment.baseUrl + 'messages';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  // CONSTRUCTEUR
  constructor(private http: HttpClient) { }

  // LISTER TOUS LES MESSAGES
  listerMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(`${URL_BACKEND}`);
  }

  // AJOUT D'UN MESSAGE
  publierMessage(contenu: string): Observable<Message> {
    return this.http.post<Message>(`${URL_BACKEND}`,
      {
        contenu: `${contenu}`
      });
  }
}
