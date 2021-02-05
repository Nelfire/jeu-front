import { Joueur } from "../auth/auth.domains";
import { Unitee } from "./unitee";

export class Armee {
    constructor(public joueur: Joueur, 
        public unitee: Unitee, 
        public quantitee: number, 
        public dateDebutProduction: number, 
        public dateFinProduction: number) {
        
    }
}