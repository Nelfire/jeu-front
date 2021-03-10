import { Joueur } from "../auth/auth.domains";
import { Campagne } from "./campagne";
import { Unitee } from "./unitee";

export class CampagneJoueur {
    constructor(
        public id: number,
        public joueur: Joueur,
        public campagne: Campagne,
        public dateDebutCampagne: number,
        public dateFinCampagne: number,
        public uniteeEnvoiJoueur: Unitee[],
        public recompenseRecuperee: Boolean,
        public pourcentageReussite: number,
        public etatCampagne: number,
        public nombreTentatives: number) { }
}