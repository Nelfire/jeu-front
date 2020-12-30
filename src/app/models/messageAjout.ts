import { TypeAbsence } from './type-absence';
import { Joueur } from '../auth/auth.domains';

export class MessageAjout {
  constructor(public datePublication: Date, public joueur: Joueur, public contenu: string) {
  }

}
