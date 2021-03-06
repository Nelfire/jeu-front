import { Component, OnInit } from '@angular/core';
import {BackendLink} from './tech.domains';
import { TechService } from '../service/tech.service';

/**
 * Composant d'affichage d'informations techniques (liens utiles pour connaître l'état du backend).
 *
 * Ce composant permet de valider la communication avec le backend.
 */
@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styles: []
})
export class TechComponent implements OnInit {

  links: BackendLink[] = [];

  constructor(private _techSrv: TechService) { }

  ngOnInit() {
   this._techSrv.listBackendLinks().subscribe(
     link => this.links.push(link)
   );
  }


}
