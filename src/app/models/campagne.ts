import { CampagneArmee } from "./campagne-armee";

export class Campagne{
    constructor(public id:number, 
        public icone:string, 
        public libelle: string,
        public description: string,
        public duree: number,
        public niveau: number,
        public campagneArmee: CampagneArmee[],
        public isBoss: Boolean,
        public recompensePierre: number,
        public recompenseBois: number,
        public recompenseOr: number,
        public recompenseNourriture: number,
        public recompenseGemme: number){}
}