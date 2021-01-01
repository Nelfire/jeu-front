export class MesBatiments {
    constructor(public id: number,
      public niveau: number, 
      public tempsAmelioration: number, 
      public coutPierreAmelioration: number, 
      public coutBoisAmelioration: number, 
      public coutOrAmelioration: number, 
      public coutNourritureAmelioration: number, 
      public quantiteeStockagePierre: number, 
      public quantiteeStockageBois: number, 
      public quantiteeStockageOr: number, 
      public quantiteeStockageNourriture: number, 
      public nombreExploitantsAutorise: number, 
      public nombreExploitantsActif: number,  
      public apportRessourceHeure: number
      ) {
    }
  
  }
  