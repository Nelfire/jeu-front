import { Component, OnInit } from '@angular/core';
import { JoueurInfos } from '../models/joueur-infos';
import { JoueurService } from '../service/joueur.service';
import * as introJs from 'intro.js/intro.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  
  // INITIALISATIONS
  infosJoueur: JoueurInfos;

  constructor(private joueurService: JoueurService,
    private router: Router) { }

  ngOnInit(): void {
    this.joueurService.informationJoueurByEmail().subscribe(
      (value) => {
        this.infosJoueur = value;
      }
    );
  }

  // Premier tutoriel de présentation
  lancementTutoriel() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Header ressources
          element: '#etape1',
          intro: "Ici se trouvent vos ressources, elles se décomposent en 5 parties.",
          showStepNumber: true
        },
        { // Pierre
          element: '#ressource_pierre',
          intro: 'La <strong>pierre</strong> est extraite des <strong>carrières de pierre</strong>. Elle est la principale ressource permettant la construction de bâtiments.',
          showStepNumber: true
        },
        { // Bois
          element: '#ressource_bois',
          intro: "Le <strong>bois</strong> provient des <strong>camps de bûcherons</strong>. Il sert à la construction de bâtiments, de défenses ou encore d'unités de combat.",
          showStepNumber: true
        },
        { // Or
          element: '#ressource_or',
          intro: "L'<strong>or</strong> est extrait des <strong>mines</strong>. C'est la ressources la plus difficile à récolter. Prenez en soin !",
          showStepNumber: true
        },
        { // Nourriture
          element: '#ressource_nourriture',
          intro: "La <strong>nourriture</strong> est produite grâce aux <strong>fermes</strong>. Elle sert principalement à la formation d'unités de combat.",
          showStepNumber: true
        },
        { // Gemmes
          element: '#ressource_gemme',
          intro: 'Les <strong>gemmes</strong> quant à elle ne peuvent pas être récoltées. Elles sont attribuées aux valheureux aventuriers menant à bien des <b>expéditions</b>, ou peuvent faire partie des récompenses lorsque vous sortez victorieux des combats du <b>mode campagne</b>. <br><br>Elle permettent de faire des achats dans la boutique.',
          showStepNumber: true
        },
        { // Menu de gauche
          element: '#menu_navigation',
          intro: "Depuis ce menu, vous aurez une vue globale sur votre <strong>village</strong>.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation campement
          element: '#menu_campement',
          intro: "Vous y retrouverez les bâtiments que vous possédez.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation défense
          element: '#menu_defense',
          intro: "Vos structures de <b>défense</b> pour vous protéger des attaques d'autres joueurs.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation armée
          element: '#menu_armee',
          intro: "Vos <b>unités de combat</b>.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation expédition
          element: '#menu_expedition',
          intro: "Le menu d'<b>expéditions</b>, depuis lequel vous pourrez envoyer vos unités faire des <b>quêtes journalières</b>, pour lesquelles vous serez gracieusement récompensé.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation marché
          element: '#menu_marche',
          intro: "Un <b>marché</b> pour échanger vos ressources au marchand.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation discussion
          element: '#menu_discussion',
          intro: "Un espace de <b>discussion</b> pour communiquer avec les autres joueurs.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation carte
          element: '#menu_carte',
          intro: "Une <b>carte</b> pour connaitre la position de votre village ainsi que celle des autres joueurs, pour mener des attaques chez eux.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation campagne
          element: '#menu_campagne',
          intro: "Un <b>mode campagne</b>, pour m'aider à repousser cette mystérieuse force qui envahis petit à petit le monde <b>d'Aphiaros</b>.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation boutique
          element: '#menu_boutique',
          intro: "Et enfin une <b>boutique</b> dans laquelle vous pourrez échanger vos <b>gemmes</b> contre des ressources.",
          showStepNumber: true
        },
        { // Menu de gauche - Campement - Construire ?
          element: '#menu_campement',
          intro: "Et si nous allions construire votre <b>premier bâtiment</b> ?",
          showStepNumber: true
        }
      ]
      // Tutoriel terminé. Accueil --> Campement
    }).oncomplete(() => {
      this.router.navigate(['campement'], { queryParams: { tutoriel: 'enCours' } });
    });

    // Lancement
    intro.start();
  }

}
