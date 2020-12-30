import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Collegue } from '../auth/auth.domains';
import { AbsenceService } from '../service/absence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Initialisation
  collegue: Collegue;

  // Constructeur
  constructor(private authService: AuthService, private absenceService: AbsenceService, private router: Router) { }

  ngOnInit(): void {

    this.authService.collegueConnecteObs
      .subscribe(col => this.collegue = col,
        err => console.log('oops'));
  }

  traitementDeNuit(): void {
    this.absenceService.traitementDeNuit().subscribe();
    this.router.navigate(['visualisationAbsence']);
  }

}
