import { Campagne } from "./campagne";
import { Unitee } from "./unitee";

export class CampagneArmee {
    constructor(public unite: Unitee,
        public quantite: number,
        public campagne: Campagne) { }
}