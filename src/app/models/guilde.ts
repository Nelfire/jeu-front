import { Joueur } from "../auth/auth.domains";

export class Guilde {
    constructor(public id: number,
        public libelle: string,
        public icone: string,
        public messageAccueil: string,
        public chefGuilde: Joueur,
        public listeMembres: Joueur[],
        public niveau: number,
        public experience: number,
        public nombreMembresMaximal: number,
        public coutOrCreation: number) { }
}