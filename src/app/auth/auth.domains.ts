import { Solde } from '../models/solde';
import { Role } from '../models/role';

/**
 * Collègue utilisateur de l'application.
 */
export class Collegue {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  roles: Role[];
  solde: Solde[];

  constructor(params: any) {
    Object.assign(this, params);
  }

  estAnonyme(): boolean {
    return this.email === undefined;
  }

}
