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
import {ListerCollaborateurComponent} from './lister-collaborateur/lister-collaborateur.component';
import {VisualiserCollaborateurComponent} from './visualiser-collaborateur/visualiser-collaborateur.component';
import {MessageComponent} from './message/message.component';
import { MessagePriveComponent } from './message/message-prive/message-prive.component';
import { ModifierCollaborateurComponent } from './collegue/modifier-collaborateur/modifier-collaborateur.component';

const routes: Routes = [
  // canActivate: [StatutConnecteService] ==> Permet de verifier si l'utilisateur est connecte
  // canActivate: [StatutAdministrateurService] ==> PevisualisationCollaborateurrmet de verifier si l'utilisateur connecte est bien un administrateur
  // canActivate: [StatutManagerService] ==> Permet de verifier si l'utilisateur connecte est bien un manager
  // canActivate: [StatutEmployeService] ==> Permet de verifier si l'utilisateur connecte est bien un employe
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService]}, //  tech accessible uniquement si connecte
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, //  tech accessible uniquement si connecte
  { path: 'auth', component: AuthComponent },
  { path: 'listerJourFerme', component: ListerJourFermeComponent, canActivate: [StatutConnecteService] },
  { path: 'listerCollaborateurs', component: ListerCollaborateurComponent, canActivate: [StatutConnecteService] },
  { path: 'creationJourFerme', component: CreationJourFermeComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },

  { path: 'visualisationCollaborateur/:email', component: VisualiserCollaborateurComponent, canActivate: [StatutConnecteService] },
  { path: 'modifierCollaborateur/:email', component : ModifierCollaborateurComponent, canActivate: [StatutConnecteService, StatutAdministrateurService]},

  { path: 'modificationJourFerme/:id', component: ModificationJourFermeComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },
  { path: 'message', component: MessageComponent, canActivate: [StatutConnecteService] },
  { path: 'messagePrive/:email', component: MessagePriveComponent, canActivate: [StatutConnecteService] },
  
  
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
