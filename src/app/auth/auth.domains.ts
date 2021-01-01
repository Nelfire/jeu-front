import { Role } from '../models/role';

/**
 * Collègue utilisateur de l'application.
 */
export class Joueur {

  /** icone du joueur **/
  id: number;
  
  /** icone du joueur **/
  icone: string;

  /** pseudo du joueur **/
  pseudo: string;
  
  /** email du joueur **/
  email: string;
  
  /** descriptif fiche perso du joueur **/
  descriptif: string;
  
  /** niveau du joueur **/
  niveau: number;
  
  /** experience du joueur **/
  experience: number;
  
  /** ressources de pierre que possède le joueur **/
  pierrePossession: number;

  /** ressources de bois que possède le joueur **/
  boisPossession: number;

  /** ressources d'or que possède le joueur **/
  orPossession: number;

  /** ressources de nourriture que possède le joueur **/
  nourriturePossession: number;

  motDePasse: string;
  roles: Role[];

  constructor(params: any) {
    Object.assign(this, params);
  }

  estAnonyme(): boolean {
    return this.email === undefined;
  }

}
