import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CollegueService} from '../service/collegue.service';
import {CollegueInfos} from '../models/collegue-infos';

@Component({
  selector: 'app-visualiser-collaborateur',
  templateUrl: './visualiser-collaborateur.component.html',
  styleUrls: ['./visualiser-collaborateur.component.scss']
})
export class VisualiserCollaborateurComponent implements OnInit {

  email: string;
  collegue: CollegueInfos;
  constructor(private collegueService: CollegueService, private routerLinkActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.routerLinkActive.snapshot.params['email'];

    this.collegueService.informationCollegueByEmail(this.routerLinkActive.snapshot.params['email']).subscribe(
      (collegueRecupere) => {
        this.collegue = collegueRecupere;
      }, (error) => {
        console.log(error);
      }
    );
  }

}
