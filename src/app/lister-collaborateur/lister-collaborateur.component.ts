import { Component, OnInit } from '@angular/core';
import {Collegue} from '../auth/auth.domains';
import {CollegueService} from '../service/collegue.service';
import {CollegueInfos} from '../models/collegue-infos';

@Component({
  selector: 'app-lister-collaborateur',
  templateUrl: './lister-collaborateur.component.html',
  styleUrls: ['./lister-collaborateur.component.scss']
})
export class ListerCollaborateurComponent implements OnInit {

  // Initialisation
  listeCollaborateurs: CollegueInfos[];
  messageErreur: string;

  // Constructeur
  constructor(private collegueService: CollegueService) { }

  ngOnInit(): void {
    this.collegueService.listerInfosCollegues().subscribe(
      (collegues) => {
        this.listeCollaborateurs = collegues;
      }, (error) => {
        this.messageErreur = error;
      }
    );
  }

}
