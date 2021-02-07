import { Joueur } from "../auth/auth.domains";
import { Defense } from "./defense";

export class MesDefenses{
    constructor(public id: number,
        public joueur: Joueur,
        public defense: Defense,
        public quantite: number,
        public dateDebutConstruction: number,
        public dateFinConstruction: number
        ) {
      }
}