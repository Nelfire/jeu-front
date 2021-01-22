import { Joueur } from "../auth/auth.domains";
import { Expedition } from "./expedition";
import { Unitee } from "./unitee";

export class ExpeditionJoueur {
    constructor(
        public id: number,
        public joueur: Joueur,
        public expedition: Expedition, 
        public dateDebutExpedition: number, 
        public dateFinExpedition: number, 
        public uniteeEnvoiJoueur: Unitee[],
        public recompenseRecuperee: Boolean,
        public pourcentageReussite: number,
        public etatExpedition: number) {}
}