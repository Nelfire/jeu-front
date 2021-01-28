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

  constructor(private http: HttpClient) { }

  listerMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(`${URL_BACKEND}`);
  }

  publierMessage(contenu: string): Observable<Message> {
    console.log(contenu); // Donnée correctement récupérée
    return this.http.post<Message>(`${URL_BACKEND}`,
      {
        contenu: `${contenu}`
      });
  }
}
