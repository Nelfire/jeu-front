import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Joueur } from './auth/auth.domains';
import { AuthService } from './service/auth.service';
import { GenerationRessourcesService } from './service/generation-ressources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Initialisations
  joueurConnecte: Observable<Joueur>;

  // Constructeur
  constructor(private authSrv: AuthService, private router: Router,
    private generationRessourcesService:GenerationRessourcesService) {
  }

  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
  }

  ngOnInit(): void {
    this.joueurConnecte = this.authSrv.joueurConnecteObs;
  }

  // A CHAQUES CHANGEMENT DE ROUTE, ACTUALISATION DES RESSOURCES/APPORT/LIMITES du joueur
  changeOfRoutes() {
    // A l'initialisation de la page, mise à jour des ressources joueur.
    this.generationRessourcesService.onFirstComponentButtonClick();
  }
}
