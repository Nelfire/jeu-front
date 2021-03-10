import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campagne } from 'src/app/models/campagne';
import { CampagneJoueur } from 'src/app/models/campagne-joueur';
import { Unitee } from 'src/app/models/unitee';
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

  listerLesCampagnesMonde(numeroMonde: number): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${URL_BACKEND}/listerLesCampagnesMonde?numeroMonde=` + numeroMonde);
  }

  /**
   * DETAILS D'UNE CAMPAGNE (Via ID)
   */
  detailsCampagne(id: number): Observable<Campagne> {
    return this.http.get<Campagne>(`${URL_BACKEND}/detailsCampagne?id=` + id);
  }


  // Création d'une nouvelle campagne
  administrationCreationCampagne(icone: string,
    libelle: string,
    description: string,
    duree: number,
    monde: number,
    niveau: number,
    unitee: number,
    quantitee: number,
    isBoss: boolean,
    recompensePierre: number,
    recompenseBois: number,
    recompenseOr: number,
    recompenseNourriture: number,
    recompenseGemme: number,
    recompenseExperience: number): Observable<Campagne> {
    return this.http.post<Campagne>(`${URL_BACKEND}`,
      {
        icone: `${icone}`,
        libelle: `${libelle}`,
        description: `${description}`,
        duree: `${duree}`,
        monde: `${monde}`,
        niveau: `${niveau}`,
        idUnite: `${unitee}`,
        quantitee: `${quantitee}`,
        isBoss: `${isBoss}`,
        recompensePierre: `${recompensePierre}`,
        recompenseBois: `${recompenseBois}`,
        recompenseOr: `${recompenseOr}`,
        recompenseNourriture: `${recompenseNourriture}`,
        recompenseGemme: `${recompenseGemme}`,
        recompenseExperience: `${recompenseExperience}`
      });
  }


  // Modification d'unitées depuis la page d'administration
  administrationModificationCampagne(
    id: number,
    icone: string,
    libelle: string,
    description: string,
    duree: number,
    monde: number,
    niveau: number,
    unitee: number,
    quantitee: number,
    isBoss: boolean,
    recompensePierre: number,
    recompenseBois: number,
    recompenseOr: number,
    recompenseNourriture: number,
    recompenseGemme: number,
    recompenseExperience: number): Observable<Campagne> {
    return this.http.put<Campagne>(`${URL_BACKEND}/modificationCampagne?id=` + id,
      {
        id: `${id}`,
        icone: `${icone}`,
        libelle: `${libelle}`,
        description: `${description}`,
        duree: `${duree}`,
        monde: `${monde}`,
        niveau: `${niveau}`,
        idUnite: `${unitee}`,
        quantitee: `${quantitee}`,
        isBoss: `${isBoss}`,
        recompensePierre: `${recompensePierre}`,
        recompenseBois: `${recompenseBois}`,
        recompenseOr: `${recompenseOr}`,
        recompenseNourriture: `${recompenseNourriture}`,
        recompenseGemme: `${recompenseGemme}`,
        recompenseExperience: `${recompenseExperience}`
      });
  }
}
