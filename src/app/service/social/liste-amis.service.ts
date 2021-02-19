import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjoutAmi } from 'src/app/models/ajout-ami';
import { ListeAmis } from 'src/app/models/liste-amis';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'listeAmis';

@Injectable({
  providedIn: 'root'
})
export class ListeAmisService {

  constructor(private http: HttpClient) { }

  /*
   * AJOUTER UN NOUVEL AMI
   */
  ajouterAmi(idAmi: number): Observable<AjoutAmi> {
    console.log("service : " + idAmi)
    return this.http.post<AjoutAmi>(`${URL_BACKEND}`,
      {
        idAmi: `${idAmi}`
      });
  }

  /*
   * LISTER LES AMIS DU JOUEUR
   */
  lister(): Observable<ListeAmis> {
    return this.http.get<ListeAmis>(`${URL_BACKEND}/lister`);
  }


  /*
   * MODIFICATION LISTE AMI (Retrait d'un ami)
   */
  retirerAmi(id: number): Observable<AjoutAmi> {
    return this.http.put<AjoutAmi>(`${URL_BACKEND}/retirerAmi?id=` + id,
      {
        id: `${id}`
      });
  }
}
