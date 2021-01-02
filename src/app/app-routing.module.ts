import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { AuthComponent } from './auth/auth.component';
import { ListerJourFermeComponent } from './jourFerme/lister-jour-ferme/lister-jour-ferme.component';
import { CreationJourFermeComponent } from './jourFerme/creation-jour-ferme/creation-jour-ferme.component';
import { StatutConnecteService } from './service/statut-connecte.service';
import { StatutAdministrateurService } from './service/statut-administrateur.service';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { ModificationJourFermeComponent } from './jourFerme/modification-jour-ferme/modification-jour-ferme.component';
import { StatutManagerService } from './service/statut-manager.service';
import { AccueilComponent } from './accueil/accueil.component';
import {ListerJoueurComponent} from './lister-joueur/lister-joueur.component';
import {VisualiserJoueurComponent} from './visualiser-joueur/visualiser-joueur.component';
import {MessageComponent} from './message/message.component';
import { MessagePriveComponent } from './message/message-prive/message-prive.component';
import { ModifierJoueurComponent } from './joueur/modifier-joueur/modifier-joueur.component';
import { MonCampementComponent } from './campement/mon-campement/mon-campement.component';
import { MonArmeeComponent } from './armee/mon-armee/mon-armee.component';
import { GuildeComponent } from './social/guilde/guilde.component';
import { ClassementJoueursComponent } from './social/classement-joueurs/classement-joueurs.component';
import { DetailBatimentComponent } from './batiment/detail-batiment/detail-batiment.component';

const routes: Routes = [
  // canActivate: [StatutConnecteService] ==> Permet de verifier si l'utilisateur est connecte
  // canActivate: [StatutAdministrateurService] ==> PevisualisationJoueurrmet de verifier si l'utilisateur connecte est bien un administrateur
  // canActivate: [StatutManagerService] ==> Permet de verifier si l'utilisateur connecte est bien un manager
  // canActivate: [StatutEmployeService] ==> Permet de verifier si l'utilisateur connecte est bien un employe
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService]}, //  tech accessible uniquement si connecte
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, //  tech accessible uniquement si connecte
  { path: 'auth', component: AuthComponent },
  { path: 'listerJourFerme', component: ListerJourFermeComponent, canActivate: [StatutConnecteService] },
  { path: 'listerJoueurs', component: ListerJoueurComponent, canActivate: [StatutConnecteService] },
  { path: 'creationJourFerme', component: CreationJourFermeComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },

  { path: 'visualisationJoueur/:email', component: VisualiserJoueurComponent, canActivate: [StatutConnecteService] },
  { path: 'modifierJoueur/:email', component : ModifierJoueurComponent, canActivate: [StatutConnecteService, StatutAdministrateurService]},

  { path: 'modificationJourFerme/:id', component: ModificationJourFermeComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },
  { path: 'message', component: MessageComponent, canActivate: [StatutConnecteService] },
  { path: 'messagePrive/:email', component: MessagePriveComponent, canActivate: [StatutConnecteService] },
  { path: 'campement', component: MonCampementComponent, canActivate: [StatutConnecteService] },
  { path: 'armee', component: MonArmeeComponent, canActivate: [StatutConnecteService] },
  { path: 'guilde', component: GuildeComponent, canActivate: [StatutConnecteService] },
  { path: 'classement-joueurs', component: ClassementJoueursComponent, canActivate: [StatutConnecteService] },
  
  // ------------ BATIMENTS --------------
  { path: 'batiment/detail-batiment/:idTypeBatiment', component: DetailBatimentComponent, canActivate: [StatutConnecteService] },
  
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accesRefuse', component: AccesRefuseComponent, canActivate: [StatutConnecteService] },
  // Cas url inexistant
  { path: 'not-found', component: FourOhFourComponent , canActivate: [StatutConnecteService]},
  
  // Bien faire attention de laisser ce path en fin de liste, mettre les votres avant.
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
