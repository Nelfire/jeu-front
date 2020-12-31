import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'campement';

@Injectable({
  providedIn: 'root'
})
export class CampementService {

  constructor() { }
}
