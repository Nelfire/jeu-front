import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Joueur } from '../auth/auth.domains';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // INITIALISATIONS
  joueur: Joueur;

  // CONSTRUCTEUR
  constructor(private authService: AuthService) { }

  // NGONINIT
  ngOnInit(): void {
    this.authService.joueurConnecteObs
      .subscribe(col => this.joueur = col,
        err => console.log('oops'));
  }
}
