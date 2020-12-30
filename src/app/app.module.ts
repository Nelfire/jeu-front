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
import { DemandeAbsenceComponent } from './absence/demande-absence/demande-absence.component';
import { JourFermeService } from './service/jour-ferme.service';
import { VisualisationAbsenceComponent } from './absence/visualisation-absence/visualisation-absence.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModificationAbsenceComponent } from './absence/modification-absence/modification-absence.component';
import { ModificationJourFermeComponent } from './jourFerme/modification-jour-ferme/modification-jour-ferme.component';
import { VueSynthetiquesComponent } from './vue-synthetiques/vue-synthetiques.component';
import { VueParDepartementParJourParCollaborteurComponent } from './vue-synthetiques/vue-par-departement-par-jour-par-collaborteur/vue-par-departement-par-jour-par-collaborteur.component';
import { HistogrammeParDepartementParJourComponent } from './vue-synthetiques/histogramme-par-departement-par-jour/histogramme-par-departement-par-jour.component';
import { CollegueService } from './service/collegue.service';
import { ValidationDemandesComponent } from './validation-demandes/validation-demandes.component';
import { PlanningAbsenceComponent } from './absence/planning-absence/planning-absence.component';
import { AbsenceService } from './service/absence.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AccueilComponent } from './accueil/accueil.component';
import { ListerCollaborateurComponent } from './lister-collaborateur/lister-collaborateur.component';
import { VisualiserCollaborateurComponent } from './visualiser-collaborateur/visualiser-collaborateur.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './service/message.service';
import { MessagePriveComponent } from './message/message-prive/message-prive.component';
import { ListerCompetenceComponent } from './competence/lister-competence/lister-competence.component';
import { AjouterCompetenceComponent } from './competence/ajouter-competence/ajouter-competence.component';
import { CompetenceService } from './service/competence.service';
import { DetailCompetenceComponent } from './competence/detail-competence/detail-competence.component';
import { ModifierCompetenceComponent } from './competence/modifier-competence/modifier-competence.component';
import { ModifierCollaborateurComponent } from './collegue/modifier-collaborateur/modifier-collaborateur.component';


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
    DemandeAbsenceComponent,
    VisualisationAbsenceComponent,
    ModificationAbsenceComponent,
    ModificationJourFermeComponent,
    VueSynthetiquesComponent,
    VueParDepartementParJourParCollaborteurComponent,
    HistogrammeParDepartementParJourComponent,
    PlanningAbsenceComponent,
    ValidationDemandesComponent,
    AccueilComponent,
    ListerCollaborateurComponent,
    VisualiserCollaborateurComponent,
    MessageComponent,
    MessagePriveComponent,
    ListerCompetenceComponent,
    AjouterCompetenceComponent,
    DetailCompetenceComponent,
    ModifierCompetenceComponent,
    ModifierCollaborateurComponent
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
    AbsenceService,
    CollegueService,
    MessageService,
    CompetenceService,
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
