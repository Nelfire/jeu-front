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
import { CreationJourFermeComponent } from './jourFerme/creation-jour-ferme/creation-jour-ferme.component';
import { ListerJourFermeComponent } from './jourFerme/lister-jour-ferme/lister-jour-ferme.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { JourFermeService } from './service/jour-ferme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModificationJourFermeComponent } from './jourFerme/modification-jour-ferme/modification-jour-ferme.component';
import { JoueurService } from './service/joueur.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AccueilComponent } from './accueil/accueil.component';
import { ListerJoueurComponent } from './lister-joueur/lister-joueur.component';
import { VisualiserJoueurComponent } from './visualiser-joueur/visualiser-joueur.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './service/message.service';
import { MessagePriveComponent } from './message/message-prive/message-prive.component';
import { CompetenceService } from './service/competence.service';
import { ModifierJoueurComponent } from './joueur/modifier-joueur/modifier-joueur.component';
import { MonCampementComponent } from './campement/mon-campement/mon-campement.component';
import { MonArmeeComponent } from './armee/mon-armee/mon-armee.component';
import { GuildeComponent } from './social/guilde/guilde.component';
import { ClassementJoueursComponent } from './social/classement-joueurs/classement-joueurs.component';
import { CampementService } from './service/campement.service';
import { BatimentService } from './service/batiment.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    HeaderComponent,
    FooterComponent,
    CreationJourFermeComponent,
    ListerJourFermeComponent,
    AccesRefuseComponent,
    FourOhFourComponent,
    ModificationJourFermeComponent,
    AccueilComponent,
    ListerJoueurComponent,
    VisualiserJoueurComponent,
    MessageComponent,
    MessagePriveComponent,
    ModifierJoueurComponent,
    MonCampementComponent,
    MonArmeeComponent,
    GuildeComponent,
    ClassementJoueursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    FullCalendarModule
  ],
  providers: [
    JourFermeService,
    JoueurService,
    MessageService,
    CompetenceService,
    CampementService,
    BatimentService,
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
