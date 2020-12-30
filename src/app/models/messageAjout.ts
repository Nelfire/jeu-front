import { TypeAbsence } from './type-absence';
import { Collegue } from '../auth/auth.domains';

export class MessageAjout {
  constructor(public datePublication: Date, public collegue: Collegue, public contenu: string) {
  }

}
