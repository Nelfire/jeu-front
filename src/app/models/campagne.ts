import { Unitee } from "./unitee";

export class Campagne {
    constructor(public id: number,
        public icone: string,
        public libelle: string,
        public description: string,
        public duree: number,
        public monde: number,
        public niveau: number,
        public unitee: Unitee,
        public quantitee: number,
        public isBoss: Boolean,
        public recompensePierre: number,
        public recompenseBois: number,
        public recompenseOr: number,
        public recompenseNourriture: number,
        public recompenseGemme: number,
        public recompenseExperience: number) { }
}