import { Joueur } from "../auth/auth.domains";

export class Message {
  constructor(public datePublication: string, public joueur: Joueur, public contenu: string) {
  }

}
