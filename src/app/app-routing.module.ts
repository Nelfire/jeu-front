import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { AuthComponent } from './auth/auth.component';
import { StatutConnecteService } from './service/statut-connecte.service';
import { StatutAdministrateurService } from './service/statut-administrateur.service';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { StatutManagerService } from './service/statut-manager.service';
import { AccueilComponent } from './accueil/accueil.component';
import { ListerJoueurComponent } from './lister-joueur/lister-joueur.component';
import { MessageComponent } from './message/message.component';
import { MessagePriveComponent } from './message/message-prive/message-prive.component';
import { ModifierJoueurComponent } from './joueur/modifier-joueur/modifier-joueur.component';
import { MonCampementComponent } from './campement/mon-campement/mon-campement.component';
import { MonArmeeComponent } from './armee/mon-armee/mon-armee.component';
import { ClassementJoueursComponent } from './social/classement-joueurs/classement-joueurs.component';
import { DetailBatimentComponent } from './batiment/detail-batiment/detail-batiment.component';
import { MenuAdministrationComponent } from './administration/menu-administration/menu-administration.component';
import { DetailUniteeComponent } from './unitee/detail-unitee/detail-unitee.component';
import { ListeExpeditionsComponent } from './expedition/liste-expeditions/liste-expeditions.component';
import { DetailExpeditionComponent } from './expedition/detail-expedition/detail-expedition.component';
import { ListeExpeditionsJoueurComponent } from './expedition/liste-expeditions-joueur/liste-expeditions-joueur.component';
import { CreerGuildeComponent } from './social/guilde/creer-guilde/creer-guilde/creer-guilde.component';
import { ListeGuildesComponent } from './social/guilde/liste-guildes/liste-guildes/liste-guildes.component';
import { MaGuildeComponent } from './social/guilde/ma-guilde/ma-guilde/ma-guilde.component';
import { RechercherGuildeComponent } from './social/guilde/rechercher-guilde/rechercher-guilde/rechercher-guilde.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { DiscussionComponent } from './social/discussion/discussion.component';
import { CreationCompteComponent } from './auth/creation-compte/creation-compte.component';
import { DetailCompteComponent } from './social/detail-compte/detail-compte.component';
import { DiscussionPriveeComponent } from './social/discussion/discussion-privee/discussion-privee.component';
import { MesDefensesComponent } from './campement/mes-defenses/mes-defenses.component';
import { DetailDefenseComponent } from './batiment/detail-defense/detail-defense.component';
import { ListeBatimentComponent } from './administration/batiment/liste-batiment/liste-batiment.component';
import { ModificationBatimentComponent } from './administration/batiment/modification-batiment/modification-batiment.component';
import { ListeDefenseComponent } from './administration/defense/liste-defense/liste-defense.component';
import { ModificationDefenseComponent } from './administration/defense/modification-defense/modification-defense.component';
import { ListeUniteeComponent } from './administration/unitee/liste-unitee/liste-unitee.component';
import { CreationUniteeComponent } from './administration/unitee/creation-unitee/creation-unitee.component';
import { ModificationUniteeComponent } from './administration/unitee/modification-unitee/modification-unitee.component';
import { ListeAmisComponent } from './social/liste-amis/liste-amis.component';
import { MerciComponent } from './divers/merci/merci.component';
import { AnnonceAVenirComponent } from './divers/annonce-a-venir/annonce-a-venir.component';
import { TantPisComponent } from './divers/tant-pis/tant-pis.component';
import { UsineComponent } from './usine/usine.component';


const routes: Routes = [
  // canActivate: [StatutConnecteService] ==> Permet de verifier si l'utilisateur est connecte
  // canActivate: [StatutAdministrateurService] ==> PevisualisationJoueurrmet de verifier si l'utilisateur connecte est bien un administrateur
  // canActivate: [StatutManagerService] ==> Permet de verifier si l'utilisateur connecte est bien un manager
  // canActivate: [StatutEmployeService] ==> Permet de verifier si l'utilisateur connecte est bien un employe
  { path: 'accueil', component: AccueilComponent, canActivate: [StatutConnecteService] }, //  tech accessible uniquement si connecte
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, //  tech accessible uniquement si connecte

  // ------------ AUTHENTIFICATION ----------------
  { path: 'auth', component: AuthComponent },
  // ------------ CREATION DE COMPTE ----------------
  { path: 'creationCompte', component: CreationCompteComponent},


  { path: 'modifierJoueur/:email', component: ModifierJoueurComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },

  { path: 'message', component: MessageComponent, canActivate: [StatutConnecteService] },
  { path: 'messagePrive/:email', component: MessagePriveComponent, canActivate: [StatutConnecteService] },
  { path: 'campement', component: MonCampementComponent, canActivate: [StatutConnecteService] },
  { path: 'defense', component: MesDefensesComponent, canActivate: [StatutConnecteService] },

  { path: 'armee', component: MonArmeeComponent, canActivate: [StatutConnecteService] },
  { path: 'classement-joueurs', component: ClassementJoueursComponent, canActivate: [StatutConnecteService] },

  // ------------ GUILDES ----------------
  { path: 'creerGuilde', component: CreerGuildeComponent, canActivate: [StatutConnecteService] },
  { path: 'listeGuildes', component: ListeGuildesComponent, canActivate: [StatutConnecteService] },
  { path: 'maGuilde', component: MaGuildeComponent, canActivate: [StatutConnecteService] },
  { path: 'rechercheGuilde', component: RechercherGuildeComponent, canActivate: [StatutConnecteService] },
  // ------------ BATIMENTS --------------
  { path: 'batiment/detail-batiment/:idTypeBatiment', component: DetailBatimentComponent, canActivate: [StatutConnecteService] },

    // ------------ DEFENSES --------------

  { path: 'defense/detail-defense/:idDefense', component: DetailDefenseComponent, canActivate: [StatutConnecteService] },



  // ------------ ADMINISTRATION --------------
  { path: 'menuAdministration', component: MenuAdministrationComponent, canActivate: [StatutAdministrateurService] },
  // - Bâtiments -
  { path: 'listeBatiment', component: ListeBatimentComponent, canActivate: [StatutAdministrateurService]}, 
  { path: 'modificationBatiment/:id', component: ModificationBatimentComponent, canActivate: [StatutAdministrateurService]}, 
  // - Défenses -
  { path: 'listeDefense', component: ListeDefenseComponent, canActivate: [StatutAdministrateurService]}, 
  { path: 'modificationDefense/:id', component: ModificationDefenseComponent, canActivate: [StatutAdministrateurService]}, 
  // - Unitées -
  { path: 'listeUnitee', component: ListeUniteeComponent, canActivate: [StatutAdministrateurService] },
  { path: 'creationUnitee', component: CreationUniteeComponent, canActivate: [StatutAdministrateurService] },
  { path: 'modificationUnitee/:id', component: ModificationUniteeComponent, canActivate: [StatutAdministrateurService] },

  // ------------- UNITEE ---------------

  { path: 'unitee/detail-unitee/:id', component: DetailUniteeComponent, canActivate: [StatutConnecteService] },

  // ------------- EXPEDITIONS ---------------

  // - Liste expéditions
  { path: 'expedition', component: ListeExpeditionsComponent, canActivate: [StatutConnecteService] },
  // - Detail expédition
  { path: 'expedition/detail-expedition/:id', component: DetailExpeditionComponent, canActivate: [StatutConnecteService]},
  // - Liste expéditions joueur
  { path: 'mesExpeditions', component: ListeExpeditionsJoueurComponent, canActivate: [StatutConnecteService]},

  // ------------- BOUTIQUE -------------
  { path: 'boutique', component: BoutiqueComponent, canActivate: [StatutConnecteService]},

  // ------------- DISCUSSION -------------
  { path: 'discussion', component: DiscussionComponent, canActivate: [StatutConnecteService]},
  // ---- privée ---
  { path: 'discussionPrivee/:id', component: DiscussionPriveeComponent, canActivate: [StatutConnecteService]},

  // ------------- JOUEUR -------------
  { path: 'detailJoueur/:id', component: DetailCompteComponent, canActivate: [StatutConnecteService]},
  { path: 'modificationJoueur', component: ModifierJoueurComponent, canActivate: [StatutConnecteService]},
  { path: 'listeAmis', component: ListeAmisComponent, canActivate: [StatutConnecteService]},

  // --------- USINE -----------
  { path: 'usine', component: UsineComponent, canActivate: [StatutConnecteService]},
  // --------- DIVERS -----------
  
  { path: 'merciInfiniment', component: MerciComponent, canActivate: [StatutConnecteService]},
  { path: 'tantPis', component: TantPisComponent, canActivate: [StatutConnecteService]},
  { path: 'aVenir', component: AnnonceAVenirComponent, canActivate: [StatutConnecteService]},
  
  // --------- REDIRECTIONS ---------
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accesRefuse', component: AccesRefuseComponent, canActivate: [StatutConnecteService] },
  // Cas url inexistant
  { path: 'not-found', component: FourOhFourComponent, canActivate: [StatutConnecteService] },

  // Bien faire attention de laisser ce path en fin de liste.
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
