import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { InformationRessourcesJoueur } from '../models/informationRessourcesJoueur';
import { JoueurService } from './joueur.service';

@Injectable({
  providedIn: 'root'
})
export class GenerationRessourcesService {
  // INITIALISATIONS
  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  // CONSTRUCTEUR
  constructor() { }

  onFirstComponentButtonClick() {
    this.invokeFirstComponentFunction.emit();
  }
}
