import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';

@Injectable({
  providedIn: 'root'
})
export class TutorielService {

  constructor() { }

  // Tutoriel accueil
  tutorielAccueil() {
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Depuis ce menu vous pouvez produire des unités de combat. <br><br> Les unités sont classées par dégat qu'elles infligent.",
          showStepNumber: true
        },
        { // Annonce
          intro: "La production de certaines unités peut nécessité la construction de bâtiments spécifique ou encore de monter le niveau du bâtiment.",
          showStepNumber: true
        },
        { // Unité
          element: '#unite13',
          intro: "Une unité, quelle quelle soit, possèdera: <br>- Un coût.<br>- Des points de vie.<br>- De l'attaque.<br>- De la portée.<br>- De l'armure.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Ceci est une unité de combat.",
          showStepNumber: true
        },
        { // Statistiques
          element: '#statistiques_unite',
          intro: "Vous retrouverez à cet endroit les statistiques de l'unité.",
          showStepNumber: true
        },
        { // Cout
          element: '#cout_unite',
          intro: "Là, le coût de formation et le temps à attendre pour qu'elle soit entièrement formée.",
          showStepNumber: true
        },
        { // Experience
          element: '#experience_unite',
          intro: "Chaque unité que vous produirez vous rapportera un montant d'expérience.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Depuis ce menu vous pouvez produire des structures de défense. Pour protéger votre campement des attaques d'autres joueurs.",
          showStepNumber: true
        },
        { // Unité
          element: '#defense6',
          intro: "Une défense, quelle quelle soit, possèdera: <br>- Un coût.<br>- Des points de vie.<br>- De l'attaque.<br>- De la portée.<br>- De l'armure.",
          showStepNumber: true
        }, {
          intro: 'Il existe deux types de défense :<br><br>- Les défenses dites "<b>Offensives</b>", qui possèdent beaucoup de points d\'attaque, mais sont peu résistantes : pour venir à bout de l\'ennemi.<br><br>-Les défenses dites "<b>Défensives</b>", qui possèdent elles de nombreux points de vie et d\'armure : pour temporiser la défense. ',
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Ceci est une structure de défense.",
          showStepNumber: true
        },
        { // Statistiques
          element: '#statistiques_defense',
          intro: "Vous retrouverez à cet endroit les statistiques de la défense.<br><br>Les structures <b>offensives</b> possèdent de nombreux points d'attaque, à l'inverse des structures <b>défensives</b>, qui elles, possèdent plus de points de vie et d\'armure.",
          showStepNumber: true
        },
        { // Cout
          element: '#cout_defense',
          intro: "Là, le coût de construction et le temps à attendre pour qu'elle soit entièrement construite.",
          showStepNumber: true
        },
        { // Experience
          element: '#experience_defense',
          intro: "Chaque défense que vous construirez vous rapportera un montant d'expérience.",
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
          intro: "Vous pouvez participer activement à la récolte depuis ce menu via un système de récolte-au-clic.",
          showStepNumber: true
        },
        { // Bouton récupérer production
          element: '#section_recuperer_production',
          intro: "Une fois que vous aurez produit assez de ressource, vous n'aurez plus qu'a récupérer votre production.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "C'est le classement de tous les joueurs présent sur le jeu.<br><br>L'ordre du classement est basé sur le niveau des joueurs.",
          showStepNumber: true
        },
        { // Unité
          element: '#joueur',
          intro: "Vous pouvez consulter le profil des joueurs en cliquant sur leurs pseudonyme.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Annonce
          intro: "Bienvenue dans la boutique.<br><br> Il est possible ici d'échanger vos <b>gemmes</b> contre des ressources.",
          showStepNumber: true
        },
        { // Réservoir
          element: '#montant_reservoir',
          intro: "Le montant de ressources que vous pouvez acheter est calculé en fonction de votre limite de stockage.",
          showStepNumber: true
        },
        { // Réservoir
          element: '#montant_gemme',
          intro: "Le coût sera lui aussi adapté au montant de ressources que vous allez acheter.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          intro: "Voilà votre campement.<br><br> Il existe plusieurs types de bâtiments que vous pouvez construire dans votre campement.<br><br>Des bâtiments de récolte, de stockage, millitaire, ...",
          showStepNumber: true
        },
        {
          element: "#filtre_type_batiments",
          intro: "Vous pouvez utiliser des filtres pour n'afficher que le type de bâtiment qui vous interesse.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          element: "#card_expedition",
          intro: "Ceci est une expédition.",
          showStepNumber: true
        },
        {
          element: "#expedition_recompense",
          intro: "Si vous menez à bien cette expédition, vous recevrez diverse récompenses.",
          showStepNumber: true
        },
        {
          element: "#expedition_informations",
          intro: "Vous retrouverez là les informations concernant l'expédition, ainsi que le temps durant lequel vos troupes seront en mission.",
          showStepNumber: true
        },
        {
          element: "#expedition_difficultee",
          intro: "La difficulté de l'expédition variera de 1 à 5 étoiles.",
          showStepNumber: true
        },
        {
          element: "#expedition_prochaines",
          intro: "De nouvelles expéditions sont générées tous les jours à minuit.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          element: "#card_detail_expedition",
          intro: "Ceci est une expédition.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_recompense",
          intro: "Si vous menez à bien cette expédition, vous recevrez diverse récompenses.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_experience",
          intro: "En cas de succès, l'expédition vous rapportera également beaucoup de points d'expérience.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_informations",
          intro: "Vous retrouverez là les informations concernant l'expédition, ainsi que le temps durant lequel vos troupes partiront en mission.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_pourcentage",
          intro: "Il s'agit là du pourcentage de réussite que vous avez de sortir victorieux du combat.<br><br>Plus vous enverrez de troupe réaliser cette expédition, plus le taux sera élevé.<br><br> Votre but étant de réduire à 0 les points de vie de l'expédition pour avoir 100% de réussite.",
          showStepNumber: true
        },
        {
          intro: "Prenez garde. Une expédition échouée entrainera la perte des unités que vous avez envoyé pour la réaliser.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_unite",
          intro: "Ci-dessous, ce sont toutes les unités que vous possédez, que vous pouvez envoyer pour réaliser l'expédition.<br><br> Les points de vie restants à l'expédition sont automatiquement re-calculés lorsque vous ajoutez des unités au combat.",
          showStepNumber: true
        },
        {
          element: "#detail_expedition_envoi",
          intro: "Lorsque vos troupes sont prêtes, il ne reste plus qu'a les envoyer au combat.",
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
      doneLabel: 'Continuer',
      tooltipClass: 'customTooltip',
      steps: [
        { // Présentation vue
          intro: "Bienvenue au marché.<br><br> Vous pouvez échanger ici votre excedant de production contre une ressource dont vous manquez.",
          showStepNumber: true
        },
        {
          element: "#marche_taux_de_change",
          intro: "Les ressources n'ont pas toutes la même valeur. Le taux de change vous est présenté ici.<br><br>Pour exemple, vous pouvez échanger <b>100 Or</b> contre <b>500 Nourriture</b> : l'or ayant plus de valeur.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_joueur_pierre",
          intro: "Saisissez le montant de vos ressources que vous voulez échanger.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_echange_or_checkbox",
          intro: "Sélectionnez une ressource contre laquelle échangez vos production.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_echange_or",
          intro: "Le montant de l'échange sera calculé ici.",
          showStepNumber: true
        },
        {
          element: "#marche_ressource_valider",
          intro: "S'il vous convient : validez !",
          showStepNumber: true
        }
        
      ]
    });

    // Lancement
    intro.start();
  }
}
