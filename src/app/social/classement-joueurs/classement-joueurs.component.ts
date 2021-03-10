import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Joueur } from 'src/app/auth/auth.domains';
import { JoueurInfos } from 'src/app/models/joueur-infos';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/service/auth.service';
import { JoueurService } from 'src/app/service/joueur.service';

@Component({
  selector: 'app-classement-joueurs',
  templateUrl: './classement-joueurs.component.html',
  styleUrls: ['./classement-joueurs.component.scss']
})
export class ClassementJoueursComponent implements OnInit {

  // INITIALISATIONS 
  roleEnum = Role;
  listeJoueurs: JoueurInfos[];
  messageErreur: string;
  joueurConnecte: Observable<Joueur>;

  // CONSTRUCTEUR
  constructor(private joueurService: JoueurService,
    private authSrv: AuthService) { }

  // NGONINIT
  ngOnInit(): void {
    this.joueurConnecte = this.authSrv.joueurConnecteObs;
    // RECHERCHE DES INFORMATIONS DE TOUS LES JOUEURS
    this.joueurService.listerInfosJoueurs().subscribe(
      (joueur) => {
        this.listeJoueurs = joueur;
      }, (error) => {
        this.messageErreur = error;
      }
    );
  }

}
