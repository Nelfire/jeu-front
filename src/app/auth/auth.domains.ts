import { Role } from '../models/role';

/**
 * Collègue utilisateur de l'application.
 */
export class Joueur {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  roles: Role[];

  constructor(params: any) {
    Object.assign(this, params);
  }

  estAnonyme(): boolean {
    return this.email === undefined;
  }

}
