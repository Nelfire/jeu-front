import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TechComponent } from './tech/tech.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { JourFermeService } from './service/jour-ferme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JoueurService } from './service/joueur.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AccueilComponent } from './accueil/accueil.component';
import { ListerJoueurComponent } from './lister-joueur/lister-joueur.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './service/message.service';
import { MessagePriveComponent } from './message/message-prive/message-prive.component';
import { ModifierJoueurComponent } from './joueur/modifier-joueur/modifier-joueur.component';
import { MonCampementComponent } from './campement/mon-campement/mon-campement.component';
import { MonArmeeComponent } from './armee/mon-armee/mon-armee.component';
import { ClassementJoueursComponent } from './social/classement-joueurs/classement-joueurs.component';
import { CampementService } from './service/campement.service';
import { BatimentService } from './service/batiment.service';
import { BatimentJoueurService } from './service/batiment-joueur.service';
import { DetailBatimentComponent } from './batiment/detail-batiment/detail-batiment.component';
import { UniteeService } from './service/unitee.service';
import { MenuAdministrationComponent } from './administration/menu-administration/menu-administration.component';
import { DetailUniteeComponent } from './unitee/detail-unitee/detail-unitee.component';
import { ArmeeService } from './service/armee-joueur.service';
import { ListeExpeditionsComponent } from './expedition/liste-expeditions/liste-expeditions.component';
import { ExpeditionService } from './service/expedition.service';
import { ExpeditionJoueurService } from './service/expedition-joueur.service';
import { DetailExpeditionComponent } from './expedition/detail-expedition/detail-expedition.component';
import { ListeExpeditionsJoueurComponent } from './expedition/liste-expeditions-joueur/liste-expeditions-joueur.component';
import { ListeGuildesComponent } from './social/guilde/liste-guildes/liste-guildes/liste-guildes.component';
import { CreerGuildeComponent } from './social/guilde/creer-guilde/creer-guilde/creer-guilde.component';
import { RechercherGuildeComponent } from './social/guilde/rechercher-guilde/rechercher-guilde/rechercher-guilde.component';
import { MaGuildeComponent } from './social/guilde/ma-guilde/ma-guilde/ma-guilde.component';
import { GuildeService } from './service/guilde.service';
import { BoutiqueService } from './service/boutique.service';
import { DiscussionComponent } from './social/discussion/discussion.component';
import { DiscussionService } from './service/discussion.service';
import { CreationCompteComponent } from './auth/creation-compte/creation-compte.component';
import { DetailCompteComponent } from './social/detail-compte/detail-compte.component';
import { ThousandSuffixesPipePipe } from './pipe/thousand-suffixes-pipe.pipe';
import { DiscussionPriveeComponent } from './social/discussion/discussion-privee/discussion-privee.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerationRessourcesService } from './service/generation-ressources.service';
import { MinuteSecondePipePipe } from './pipe/minute-seconde-pipe.pipe';
import { DetailDefenseComponent } from './batiment/detail-defense/detail-defense.component';
import { MesDefensesComponent } from './campement/mes-defenses/mes-defenses.component';
import { DefenseService } from './service/defense.service';
import { DefenseJoueurService } from './service/defense-joueur.service';
import { ModificationBatimentComponent } from './administration/batiment/modification-batiment/modification-batiment.component';
import { ListeBatimentComponent } from './administration/batiment/liste-batiment/liste-batiment.component';
import { ModificationDefenseComponent } from './administration/defense/modification-defense/modification-defense.component';
import { ListeDefenseComponent } from './administration/defense/liste-defense/liste-defense.component';
import { ListeUniteeComponent } from './administration/unitee/liste-unitee/liste-unitee.component';
import { CreationUniteeComponent } from './administration/unitee/creation-unitee/creation-unitee.component';
import { ModificationUniteeComponent } from './administration/unitee/modification-unitee/modification-unitee.component';
import { ListeAmisService } from './service/social/liste-amis.service';
import { ListeAmisComponent } from './social/liste-amis/liste-amis.component';
import { MerciComponent } from './divers/merci/merci.component';
import { AnnonceAVenirComponent } from './divers/annonce-a-venir/annonce-a-venir.component';
import { TantPisComponent } from './divers/tant-pis/tant-pis.component';
import { UsineComponent } from './usine/usine.component';
import { NouveauteComponent } from './divers/nouveaute/nouveaute.component';
import { MarcheComponent } from './marche/marche.component';
import { ModificationJoueurComponent } from './administration/joueur/modification-joueur/modification-joueur.component';
import { CarteComponent } from './social/carte/carte.component';
import { CampagneService } from './service/campagne/campagne.service';
import { ListeCampagnesComponent } from './campagne/liste-campagnes/liste-campagnes.component';
import { TutorielService } from './service/tutoriel.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    HeaderComponent,
    FooterComponent,
    AccesRefuseComponent,
    FourOhFourComponent,
    AccueilComponent,
    ListerJoueurComponent,
    MessageComponent,
    MessagePriveComponent,
    ModifierJoueurComponent,
    MonCampementComponent,
    MonArmeeComponent,
    ClassementJoueursComponent,
    DetailBatimentComponent,
    CreationUniteeComponent,
    MenuAdministrationComponent,
    ModificationUniteeComponent,
    DetailUniteeComponent,
    ListeExpeditionsComponent,
    DetailExpeditionComponent,
    ListeExpeditionsJoueurComponent,
    ListeGuildesComponent,
    CreerGuildeComponent,
    RechercherGuildeComponent,
    MaGuildeComponent,
    DiscussionComponent,
    CreationCompteComponent,
    DetailCompteComponent,
    ThousandSuffixesPipePipe,
    DiscussionPriveeComponent,
    MinuteSecondePipePipe,
    DetailDefenseComponent,
    MesDefensesComponent,
    ModificationBatimentComponent,
    ListeBatimentComponent,
    ListeDefenseComponent,
    ModificationDefenseComponent,
    ListeUniteeComponent,
    ListeAmisComponent,
    MerciComponent,
    AnnonceAVenirComponent,
    TantPisComponent,
    UsineComponent,
    NouveauteComponent,
    MarcheComponent,
    ModificationJoueurComponent,
    CarteComponent,
    ListeCampagnesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    FullCalendarModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    JourFermeService,
    JoueurService,
    MessageService,
    CampementService,
    BatimentService,
    BatimentJoueurService,
    UniteeService,
    ArmeeService,
    ExpeditionService,
    ExpeditionJoueurService,
    GuildeService,
    BoutiqueService,
    DiscussionService,
    GenerationRessourcesService,
    DefenseService,
    DefenseJoueurService,
    ListeAmisService,
    CampagneService,
    TutorielService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'fr-CA' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
