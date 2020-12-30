import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Joueur } from '../auth/auth.domains';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Initialisation
  joueur: Joueur;

  // Constructeur
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.joueurConnecteObs
      .subscribe(col => this.joueur = col,
        err => console.log('oops'));
  }
}
