import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JoueurService} from '../service/joueur.service';
import {JoueurInfos} from '../models/joueur-infos';

@Component({
  selector: 'app-visualiser-joueur',
  templateUrl: './visualiser-joueur.component.html',
  styleUrls: ['./visualiser-joueur.component.scss']
})
export class VisualiserJoueurComponent implements OnInit {

  email: string;
  joueur: JoueurInfos;
  constructor(private joueurService: JoueurService, private routerLinkActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.routerLinkActive.snapshot.params['email'];

    this.joueurService.informationJoueurByEmail().subscribe(
      (joueurRecupere) => {
        this.joueur = joueurRecupere;
      }
    );
  }

}
