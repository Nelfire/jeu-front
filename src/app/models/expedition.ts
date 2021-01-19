import { Joueur } from "../auth/auth.domains";

export class Expedition{
    constructor(public joueur: Joueur,
         public dureeExpedition:number,
         public pourcentageReussite:number,
         public difficultee: number,
         public degats: number,
         public vie: number,
         public armure: number,
         public coutPierre: number,
         public coutBois: number,
         public coutOr: number,
         public coutNourriture: number,
         public recompensePierre: number,
         public recompenseBois: number,
         public recompenseOr: number,
         public recompenseNourriture: number,
         public recompenseGemme: number
         ) {

    }
}