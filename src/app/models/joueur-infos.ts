import { Competence } from './competence';

export class JoueurInfos {
  constructor(public nom: string, public prenom: string, public email: string, public urlPhoto: string, public competences: Competence) {

  }
}
