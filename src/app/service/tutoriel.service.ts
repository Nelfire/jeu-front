import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as introJs from 'intro.js/intro.js';

@Injectable({
  providedIn: 'root'
})
export class TutorielService {

  // CONSTRUCTEUR
  constructor(private router: Router) { }

  /////////////////////
  // TUTORIEL MANUEL //
  /////////////////////

  // [TUTORIEL GUIDE] - [PARTIE 1] - Tutoriel de présentation
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
          intro: "Ici se trouvent vos <b>ressources</b>, elles se décomposent en 5 parties.",
          showStepNumber: true
        },
        { // Pierre
          element: '#ressource_pierre',
          intro: 'La <b class="pierre">pierre</b> est extraite des <strong>carrières de pierre</strong>. Elle est la principale ressource permettant la construction de bâtiments.',
          showStepNumber: true
        },
        { // Bois
          element: '#ressource_bois',
          intro: "Le <b class='bois'>bois</b> provient des <strong>camps de bûcherons</strong>. Il sert à la construction de bâtiments, de défenses ou encore d'unités de combat.",
          showStepNumber: true
        },
        { // Or
          element: '#ressource_or',
          intro: "L'<b class='or'>or</b> est extrait des <strong>mines</strong>. C'est la ressource la plus difficile à récolter.",
          showStepNumber: true
        },
        { // Nourriture
          element: '#ressource_nourriture',
          intro: "La <b class='nourriture'>nourriture</b> est produite grâce aux <strong>fermes</strong>. Elle sert principalement à la formation d'unités de combat.",
          showStepNumber: true
        },
        { // Gemmes
          element: '#ressource_gemme',
          intro: 'Les <b class="gemme">gemmes</b> quant à elles ne peuvent <b>pas</b> être récoltées. Elles sont attribuées aux valeureux aventuriers menant à bien des <b>expéditions</b>, ou peuvent faire partie des récompenses lorsque vous sortez victorieux des combats du <b>mode campagne</b>. <br><br>Elles permettent de faire des achats dans la <b>boutique</b>.',
          showStepNumber: true
        },
        { // Menu de gauche
          element: '#menu_navigation',
          intro: "Depuis ce menu, vous aurez une vue globale sur votre <strong>village</strong>.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation campement
          element: '#menu_campement',
          intro: "Vous y retrouverez les <b>bâtiments</b> que vous possédez.",
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
          intro: "Un espace de <b>discussions</b> pour communiquer avec les autres joueurs.",
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
          intro: "Et enfin, une <b>boutique</b>, dans laquelle vous pourrez échanger vos <b class='gemme'>gemmes</b> contre des ressources.",
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

  // [TUTORIEL GUIDE] - [PARTIE 2] - (Accueil -> Campement)
  tutorielPartie2() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          intro: "Voilà votre <b>campement</b>.<br><br> Voyez tous les bâtiments que vous allez pouvoir construire !",
          showStepNumber: true
        },
        { // Ciblage HDV. 
          element: '#btm1',
          intro: "Il est temps de construire votre <b>premier bâtiment</b>. Allons-y !",
          showStepNumber: true
        }
      ]
      // Tutoriel terminé. Campement --> Détail bâtiment Hdv
    }).oncomplete(() => {
      this.router.navigate(['batiment/detail-batiment/1'], { queryParams: { tutoriel: 'enCours' } });
    });

    // Lancement
    intro.start();
  }

  // [TUTORIEL GUIDE] - [PARTIE 3] - (Campement -> Détail HDV)
  // --------------------------------------------------------
  // [TUTORIEL GUIDE] - [PARTIE 3] - (Campement -> Détail HDV)

  // [TUTORIEL GUIDE] - [PARTIE 4] - (Détail HDV [construction] -> Détail HDV [améllioration])
  // -----------------------------------------------------------------------------------------
  // [TUTORIEL GUIDE] - [PARTIE 4] - (Détail HDV [construction] -> Détail HDV [améllioration])

  // [TUTORIEL GUIDE] - [PARTIE 5] - (Détail HDV [amélioration] -> Campement)
  // ------------------------------------------------------------------------
  // [TUTORIEL GUIDE] - [PARTIE 5] - (Détail HDV [amélioration] -> Campement)

  // [TUTORIEL GUIDE] - [PARTIE 6] - (Campement -> Campement) Présentation bâtiments de récolte
  tutorielPartie6() {
    setTimeout(() => {
      var intro = introJs();
      intro.setOptions({
        disableInteraction: true,
        showProgress: true,
        nextLabel: 'Suivant',
        prevLabel: 'Precedent',
        doneLabel: 'Continuer',
        tooltipClass: 'customTooltip',
        steps: [
          { // Focus carrière
            element: '#btm3',
            intro: "Voici la <b>carrière</b>, qui permet de récolter de la <b class='pierre'>pierre</b>.",
            showStepNumber: true
          },
          { // Focus camp de bûcheron
            element: '#btm4',
            intro: "Là, le <b>camp de bûcherons</b>, pour ramasser du <b class='bois'>bois</b>."
          },
          { // Focus camp de mineur
            element: '#btm5',
            intro: "Le <b>camp de mineur</b>, pour extraire les minerais <b>rares</b> de la terre."
          },
          { // Focus ferme
            element: '#btm6',
            intro: "Et voici la <b>ferme</b> qui permet de produire de la <b class='nourriture'>nourriture</b>.<br><br> Profitons-en pour la construire !"
          }
        ]
        // Tutoriel terminé. Campement --> Détail ferme
      }).oncomplete(() => {
        this.router.navigate(['batiment/detail-batiment/6'], { queryParams: { tutoriel: 'enCoursP2' } });
      });

      // Lancement
      intro.start();
    }, 600);
  }

  // [TUTORIEL GUIDE] - [PARTIE 7] -  (Campement -> Détail bâtiment FERME [Construire])
  // ----------------------------------------------------------------------------------
  // [TUTORIEL GUIDE] - [PARTIE 7] -  (Campement -> Détail bâtiment FERME [Construire])

  // [TUTORIEL GUIDE] - [PARTIE 8] -  (Détail bâtiment FERME [Construire] -> Détail bâtiment FERME [En cours])
  // ---------------------------------------------------------------------------------------------------------
  // [TUTORIEL GUIDE] - [PARTIE 8] -  (Détail bâtiment FERME [Construire] -> Détail bâtiment FERME [En cours])

  // [TUTORIEL GUIDE] - [PARTIE 9] -  (Amélioration ferme terminée, envoi vers le centre de clic)
  tutorielPartie9() {
    setTimeout(() => {
      var intro = introJs();
      intro.setOptions({
        disableInteraction: true,
        showProgress: true,
        nextLabel: 'Suivant',
        prevLabel: 'Precedent',
        doneLabel: 'Continuer',
        tooltipClass: 'customTooltip',
        steps: [
          { // Barre ressource nourriture
            element: '#ressource_nourriture',
            intro: "Vous avez désormais une <b>ferme</b> fonctionnelle qui produit constamment de la <b class='nourriture'>nourriture</b>.",
            showStepNumber: true
          },
          { // Barre ressource nourriture (limite)
            element: '#ressource_nourriture_limite',
            intro: "Au-delà d'une certaine limite, vos reserves seront <b>pleines</b>.<br><br> Pensez à construire des <b>structures de stockage</b>.",
            showStepNumber: true
          },
          { // Centre de récolte
            element: '#menu_centre_recolte',
            intro: "J'ai une dernière chose à vous montrer ... allons jeter un œil au <b>centre de récolte</b>.",
            showStepNumber: true
          }
        ]
        // Tutoriel terminé. Campement --> Centre de récolte
      }).oncomplete(() => {
        this.router.navigate(['centreRecolte'], { queryParams: { tutoriel: 'enCours' } });
      });

      // Lancement
      intro.start();
    }, 600);
  }

  // [TUTORIEL GUIDE] - [PARTIE 10] -  (Campement -> Centre de récolte)
  tutorielPartie10() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Terminer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Voici le <b>centre de récolte</b>.",
          showStepNumber: true
        },
        { // Bouton chasser
          element: '#section_recolte_nourriture',
          intro: "Votre ferme vous assure un apport <b>régulier</b> de <b class='nourriture'>nourriture</b>.<br><br> Mais vous pouvez, de votre côté, participer <b>activement</b> à cette récolte depuis ce menu via un système de <b>récolte-au-clic</b>.",
          showStepNumber: true
        },
        { // Bouton récupérer production
          element: '#section_recuperer_production',
          intro: "Une fois que vous aurez produit assez de ressource, vous n'aurez plus qu'à récupérer votre <b>production</b>.",
          showStepNumber: true
        },
        { // Annonce de fin
          intro: "À vous de jouer maintenant ! <br><br>Et pensez à construire vos <b>bâtiments de récolte</b>.",
          showStepNumber: true
        },
        {
          element: '#menu_tutoriel',
          intro: "Oh, une dernière chose...<br><br> Si vous veniez à être perdu. Vous pourrez solociter mon <b>aide</b> en cliquant ici.<br><br> Je vous donnerai quelques <b>informations</b> concernant la page où vous vous trouvez.<br><br>Bon jeu !",
          showStepNumber: true
        }
      ]
    }).oncomplete(() => {
      this.router.navigate(['centreRecolte']);
    });

    intro.start();
  }

  /////////////////////
  // TUTORIEL MANUEL //
  /////////////////////

  // Tutoriel accueil
  tutorielAccueil() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Header ressources
          element: '#etape1',
          intro: "Ici se trouvent vos <b>ressources</b>, elles se décomposent en 5 parties.",
          showStepNumber: true
        },
        { // Pierre
          element: '#ressource_pierre',
          intro: 'La <b class="pierre">pierre</b> est extraite des <strong>carrières de pierre</strong>. Elle est la principale ressource permettant la construction de bâtiments.',
          showStepNumber: true
        },
        { // Bois
          element: '#ressource_bois',
          intro: "Le <b class='bois'>bois</b> provient des <strong>camps de bûcherons</strong>. Il sert à la construction de bâtiments, de défenses ou encore d'unités de combat.",
          showStepNumber: true
        },
        { // Or
          element: '#ressource_or',
          intro: "L'<b class='or'>or</b> est extrait des <strong>mines</strong>. C'est la ressource la plus difficile à récolter.",
          showStepNumber: true
        },
        { // Nourriture
          element: '#ressource_nourriture',
          intro: "La <b class='nourriture'>nourriture</b> est produite grâce aux <strong>fermes</strong>. Elle sert principalement à la formation d'unités de combat.",
          showStepNumber: true
        },
        { // Gemmes
          element: '#ressource_gemme',
          intro: 'Les <b class="gemme">gemmes</b> quant à elles ne peuvent <b>pas</b> être récoltées. Elles sont attribuées aux valeureux aventuriers menant à bien des <b>expéditions</b>, ou peuvent faire partie des récompenses lorsque vous sortez victorieux des combats du <b>mode campagne</b>. <br><br>Elles permettent de faire des achats dans la <b>boutique</b>.',
          showStepNumber: true
        },
        { // Menu de gauche
          element: '#menu_navigation',
          intro: "Depuis ce menu, vous aurez une vue globale sur votre <strong>village</strong>.",
          showStepNumber: true
        },
        { // Menu de gauche - Présentation campement
          element: '#menu_campement',
          intro: "Vous y retrouverez les <b>bâtiments</b> que vous possédez.",
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
          intro: "Un espace de <b>discussions</b> pour communiquer avec les autres joueurs.",
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
          intro: "Et enfin, une <b>boutique</b>, dans laquelle vous pourrez échanger vos <b class='gemme'>gemmes</b> contre des ressources.",
          showStepNumber: true
        }
      ]
      // Tutoriel terminé. Header --> Campement (Avec paramètre URL)
    });

    // Lancement
    intro.start();
  }


  // Tutoriel Armée
  tutorielArmee() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Depuis ce menu vous pouvez produire des <b>unités de combat</b>. <br><br> Les unités sont classées par <b>dégât</b> qu'elles infligent.",
          showStepNumber: true
        },
        { // Annonce
          intro: "La production de certaines unités peut nécessiter la construction de <b>bâtiments spécifiques</b> ou encore de monter le niveau du bâtiment.",
          showStepNumber: true
        },
        { // Unité
          element: '#unite13',
          intro: "Une unité possèdera: <br><br>- Un <b>coût</b>.<br>- Des <b>points de vie</b>.<br>- De l'<b>attaque</b>.<br>- De la <b>portée</b>.<br>- De l'<b>armure</b>.",
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  // Tutoriel Détail Unité
  tutorielDetailUnite() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Ceci est une <b>unité de combat</b>.",
          showStepNumber: true
        },
        { // Statistiques
          element: '#statistiques_unite',
          intro: "Vous retrouverez à cet endroit les <b>statistiques</b> de l'unité.",
          showStepNumber: true
        },
        { // Cout
          element: '#cout_unite',
          intro: "Là, le <b>coût de formation</b> et le <b>temps</b> à attendre pour que l'unité soit entièrement formée.",
          showStepNumber: true
        },
        { // Experience
          element: '#experience_unite',
          intro: "Chaque unité que vous produirez vous rapportera un montant d'<b>expérience</b>.",
          showStepNumber: true
        },
      ]
    });

    // Lancement
    intro.start();
  }
  // Tutoriel Armée
  tutorielDefense() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Depuis ce menu vous pouvez produire des <b>structures de défense</b> : pour protéger votre campement des attaques d'autres joueurs.",
          showStepNumber: true
        },
        { // Unité
          element: '#defense6',
          intro: "Une défense possèdera: <br><br>- Un <b>coût</b>.<br>- Des <b>points de vie</b>.<br>- De l'<b>attaque</b>.<br>- De la <b>portée</b>.<br>- De l'<b>armure</b>.",
          showStepNumber: true
        }, {
          intro: 'Il existe deux types de défense :<br><br>- Les défenses dites "<b>Offensives</b>", qui possèdent beaucoup de points d\'attaque, mais sont peu résistantes : pour venir à bout de l\'ennemi.<br><br>-Les défenses dites "<b>Défensives</b>", qui possèdent elles de nombreux points de vie et d\'armure : pour temporiser le combat. ',
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  tutorielDetailBatiment() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        {
          // Présentation card
          element: '#section_batiment',
          intro: "Ceci est un <b>bâtiment</b> que vous pouvez construire dans votre <b>campement</b>.",
          showStepNumber: true
        },
        {
          // Coûts de construction
          element: '#section_cout_construction',
          intro: "Pour pouvoir lancer la construction d'un bâtiment, il vous sera nécessaire d'utiliser quelques <b>ressources</b>. <br><br> Un temps de construction est également à prévoir.<br><br> Plus le <b>niveau</b> du bâtiment sera élevé, plus le <b>temps de construction</b> sera élevé lui aussi !",
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  // Tutoriel Détail Défense
  tutorielDetailDefense() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Ceci est une <b>structure de défense</b>.",
          showStepNumber: true
        },
        { // Statistiques
          element: '#statistiques_defense',
          intro: "Vous retrouverez à cet endroit les <b>statistiques</b> de la défense.<br><br>Les structures <b>offensives</b> possèdent de nombreux points d'attaque, à l'inverse des structures <b>défensives</b>, qui elles, possèdent plus de points de vie et d\'armure.",
          showStepNumber: true
        },
        { // Cout
          element: '#cout_defense',
          intro: "Là, le <b>coût de construction</b> et le <b>temps</b> à attendre pour qu'elle soit entièrement construite.",
          showStepNumber: true
        },
        { // Experience
          element: '#experience_defense',
          intro: "Chaque <b>défense</b> que vous construirez vous rapportera un montant d'<b>expérience</b>.",
          showStepNumber: true
        },
      ]
    });

    // Lancement
    intro.start();
  }

  tutorielCentreRecolte() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Terminer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Voici le <b>centre de récolte</b>.",
          showStepNumber: true
        },
        { // Bouton chasser
          element: '#section_recolte_nourriture',
          intro: "Votre ferme vous assure un apport <b>régulier</b> de <b class='nourriture'>nourriture</b>.<br><br> Mais vous pouvez, de votre côté, participer <b>activement</b> à cette récolte depuis ce menu via un système de <b>récolte-au-clic</b>.",
          showStepNumber: true
        },
        { // Bouton récupérer production
          element: '#section_recuperer_production',
          intro: "Une fois que vous aurez produit assez de ressource, vous n'aurez plus qu'à récupérer votre <b>production</b>.",
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  // Tutoriel Classement Joueur
  tutorielClassementJoueur() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "C'est le <b>classement</b> de tous les joueurs présent sur le jeu.<br><br>L'ordre du classement est basé sur le <b>niveau</b> des joueurs.",
          showStepNumber: true
        },
        { // Unité
          element: '#joueur',
          intro: "Vous pouvez consulter le <b>profil</b> des joueurs en cliquant sur leurs noms.",
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  tutorielBoutique() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Bienvenue dans la boutique.<br><br> Il est possible ici d'échanger vos <b class='gemme'>gemmes</b> contre des ressources.",
          showStepNumber: true
        },
        { // Réservoir
          element: '#montant_reservoir',
          intro: "Le montant de ressources que vous pouvez acheter est calculé en fonction de votre <b>limite de stockage</b>.",
          showStepNumber: true
        },
        { // Réservoir
          element: '#montant_gemme',
          intro: "Le <b>coût</b> sera lui aussi adapté au montant de ressources que vous allez acheter.",
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  tutorielCampement() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          intro: "Voilà votre <b>campement</b>.<br><br> Il existe plusieurs <b>types de bâtiments</b> que vous pouvez construire dans votre campement.<br><br>Des bâtiments de récolte, de stockage, militaire, ...",
          showStepNumber: true
        },
        {
          element: "#filtre_type_batiments",
          intro: "Vous pouvez utiliser des <b>filtres</b> pour n'afficher que le type de bâtiment qui vous intéresse.",
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  tutorielExpedition() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          element: "#card_expedition",
          intro: "Ceci est une <b>expédition</b>.",
          showStepNumber: true
        },
        {
          element: "#expedition_recompense",
          intro: "Si vous menez à bien cette expédition, vous recevrez <b>diverses récompenses</b>.",
          showStepNumber: true
        },
        {
          element: "#expedition_informations",
          intro: "Vous retrouverez là les <b>informations</b> concernant l'expédition, ainsi que le <b>temps</b> durant lequel vos troupes partiront en mission.",
          showStepNumber: true
        },
        {
          element: "#expedition_difficultee",
          intro: "La difficulté de l'expédition variera de <b>1</b> à <b>5</b> étoiles.",
          showStepNumber: true
        },
        {
          element: "#expedition_prochaines",
          intro: "De <b>nouvelles expéditions</b> sont générées tous les jours à <b>minuit</b>.",
          showStepNumber: true
        }
      ]
    });

    // Lancement
    intro.start();
  }

  tutorielDetailCampagne() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          element: "#card_detail_campagne",
          intro: "Ceci est une <b>campagne</b>.",
          showStepNumber: true
        },
        {
          element: "#detail_campagne_recompense",
          intro: "Si vous menez à bien le combat, vous recevrez <b>diverses récompenses</b>.",
          showStepNumber: true
        },
        {
          element: "#detail_campagne_experience",
          intro: "En cas de <b>succès</b>, le combat vous rapportera également beaucoup de points d'<b>expérience</b>.",
          showStepNumber: true
        },
        {
          element: "#detail_campagne_informations",
          intro: "Vous retrouverez là les <b>informations</b> concernant le combat, ainsi que le <b>temps</b> durant lequel vos troupes partiront se battre.",
          showStepNumber: true
        },
        {
          element: "#detail_campagne_composition_adverse",
          intro: "Ci-contre sont affichés les <b>unités adverse</b> contre lesquelles vous allez devoir vous <b>battre</b>.",
          showStepNumber: true
        },
        {
          element: "#detail_campagne_pourcentage",
          intro: "Il s'agit là du <b>pourcentage de réussite</b> que vous avez de sortir <b>victorieux</b> du combat.<br><br>Plus vous enverrez de troupe réaliser le combat, plus vous infligerez de dégâts et le <b>taux de réussite augmentera</b>.<br><br> Votre but étant de <b>réduire à 0</b> les points de vie des troupes adverse pour avoir <b>100% de réussite</b>.",
          showStepNumber: true
        },
        {
          intro: "Prenez garde !<br><br> Un combat <b>échoué</b> entrainera la <b>perte</b> des unités que vous avez envoyées pour la réaliser.",
          showStepNumber: true
        },
        {
          element: "#detail_campagne_unite",
          intro: "Ci-dessous, ce sont toutes les <b>unités</b> que vous possédez, que vous pouvez envoyer pour réaliser le combat.<br><br> Les points de vie restante aux unités adverses sont automatiquement recalculés lorsque vous ajoutez des unités au combat.",
          showStepNumber: true
        },
        {
          element: "#detail_campagne_envoi",
          intro: "Lorsque vos troupes sont <b>prêtes</b>, il ne reste plus qu'à les <b>envoyer au combat</b>.",
          showStepNumber: true
        }

      ]
    });

    // Lancement
    intro.start();
  }

  tutorielDetailExpedition() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          element: "#card_detail_expedition",
          intro: "Ceci est une <b>expédition</b>.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_recompense",
          intro: "Si vous menez à bien cette expédition, vous recevrez <b>diverses récompenses</b>.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_experience",
          intro: "En cas de <b>succès</b>, l'expédition vous rapportera également beaucoup de points d'<b>expérience</b>.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_informations",
          intro: "Vous retrouverez là les <b>informations</b> concernant l'expédition, ainsi que le <b>temps</b> durant lequel vos troupes partiront en mission.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_pourcentage",
          intro: "Il s'agit là du <b>pourcentage de réussite</b> que vous avez de sortir <b>victorieux</b> du combat.<br><br>Plus vous enverrez de troupe réaliser le combat, plus vous infligerez de dégâts et le <b>taux de réussite augmentera</b>.<br><br> Votre but étant de <b>réduire à 0</b> les points de vie de l'expédition pour avoir <b>100% de réussite</b>.",
          showStepNumber: true
        },
        {
          intro: "Prenez garde !<br><br> Une expédition <b>échouée</b> entrainera la <b>perte</b> des unités que vous avez envoyées pour la réaliser.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_unite",
          intro: "Ci-dessous, ce sont toutes les <b>unités</b> que vous possédez, que vous pouvez envoyer pour réaliser l'expédition.<br><br> Les points de vie restante à l'expédition sont automatiquement recalculés lorsque vous ajoutez des unités au combat.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_envoi",
          intro: "Lorsque vos troupes sont <b>prêtes</b>, il ne reste plus qu'à les <b>envoyer au combat</b>.",
          showStepNumber: true
        }

      ]
    });

    // Lancement
    intro.start();
  }

  tutorielMarche() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          intro: "Bienvenue au <b>marché</b>.<br><br> Vous pouvez échanger ici <b>votre production</b> contre une <b>autre ressource</b> dont vous manquez.",
          showStepNumber: true
        },
        {
          element: "#marche_taux_de_change",
          intro: "Les ressources n'ont pas toutes la même valeur. Le <b>taux de change</b> vous est présenté ici.<br><br>Pour exemple, vous pouvez échanger <b class='or'>100 Or</b> contre <b class='nourriture'>500 Nourriture</b> : <b class='or'>l'or</b> ayant plus de valeur.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_joueur_pierre",
          intro: "Saisissez le <b>montant de vos ressources</b> que vous voulez <b>échanger</b>.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_echange_or_checkbox",
          intro: "Sélectionnez une ressource contre laquelle <b>échanger votre production</b>.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_echange_or",
          intro: "Le montant de l'échange sera calculé ici.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_valider",
          intro: "S'il vous convient : <b>validez</b> !",
          showStepNumber: true
        }

      ]
    });

    // Lancement
    intro.start();
  }

  tutorielCampagne() {
    var intro = introJs();
    intro.setOptions({
      disableInteraction: true,
      showProgress: true,
      nextLabel: 'Suivant',
      prevLabel: 'Precedent',
      doneLabel: 'Compris !',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          intro: "Bienvenue dans le mode <b>campagne</b>.<br><br> Dans ce mode vous pourrez m'aider, au travers de multiples combats, à reprendre petit à petit le contrôle sur <b>Aphiaros</b>.",
          showStepNumber: true
        },
        {
          element: "#campagne_filtre",
          intro: "Il existe plusieurs <b>mondes</b> dans la campagne. Vous pouvez vous aider de ce menu-là pour les <b>filtrer</b>.",
          showStepNumber: true
        },
        {
          element: "#campagne_liste",
          intro: "Un monde est composé de <b>15 étages</b>. La difficulté croit petit à petit.<br><br>Pour débloquer l'étage suivant il faut au préalable réaliser les combats des <b>étages inférieurs</b>.",
          showStepNumber: true
        },
        {
          element: "#campagne_niveau_1",
          intro: "Les étages comme celui-ci sont des étages de <b>difficulté normale</b>.",
          showStepNumber: true
        },
        {
          element: "#campagne_niveau_5",
          intro: "Certains étages ont une <b>apparence différente</b>. Ils ont une difficulté accrue et de meilleures récompenses.<br><br>Ce sont des <b>boss</b>, armez-vous bien.",
          showStepNumber: true
        },
        {
          intro: "Chaque fois que vous sortirez <b>victorieux</b> d'un combat je vous en <b>récompenserai</b>.",
          showStepNumber: true
        },
        {
          intro: "Bonne chance, aventurier.",
          showStepNumber: true
        }

      ]
    });

    // Lancement
    intro.start();
  }

}
