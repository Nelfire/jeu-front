export class Batiment {
    constructor(public id: number,
      public icone: string, 
      public libelle: string, 
      public descriptif: string, 
      public niveau: number, 
      public ouvrierNecessaireConstruction: number, 
      public tempsDeConstruction: number, 
      public tempsAmelioration: number, 
      public coutPierreConstruction: number, 
      public coutPierreAmelioration: number, 
      public coutBoisConstruction: number, 
      public coutBoisAmelioration: number, 
      public coutOrConstruction: number, 
      public coutOrAmelioration: number, 
      public coutNourritureConstruction: number, 
      public coutNourritureAmelioration: number, 
      public quantiteeStockagePierre: number, 
      public quantiteeStockageBois: number, 
      public quantiteeStockageOr: number, 
      public quantiteeStockageNourriture: number, 
      public nombreExploitantsAutorise: number, 
      public nombreExploitantsActif: number,  
      public apportRessourceHeure: number,  
      public niveauHotelDeVilleNecessaireConstruction: number
      ) {
    }
  
  }
  