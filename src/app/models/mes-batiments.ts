import { Joueur } from "../auth/auth.domains";
import { Batiment } from "./batiment";

export class MesBatiments {
  constructor(public id: number,
    public joueur: Joueur,
    public batiment: Batiment,
    public niveau: number,
    public tempsAmelioration: number,
    public coutPierreAmelioration: number,
    public coutBoisAmelioration: number,
    public coutOreAmelioration: number,
    public coutNourritureAmelioration: number,
    public quantiteeStockagePierre: number,
    public quantiteeStockageBois: number,
    public quantiteeStockageOr: number,
    public quantiteeStockageNourriture: number,
    public nombreExploitantsAutorise: number,
    public nombreExploitantsActif: number,
    public apportPierreHeure: number,
    public apportBoisHeure: number,
    public apportOreHeure: number,
    public apportNourritureHeure: number,
    public dateDebutConstruction: number,
    public dateFinConstruction: number
  ) {
  }

}
