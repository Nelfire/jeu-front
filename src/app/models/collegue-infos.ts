import { Competence } from './competence';

export class CollegueInfos {
  constructor(public nom: string, public prenom: string, public email: string, public urlPhoto: string, public competences: Competence) {

  }
}
