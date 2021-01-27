export class Batiment {
    constructor(public id: number,
      public icone: string, 
      public idTypeBatiment: number, 
      public idCategorieBatiment: number,
      public libelle: string, 
      public descriptif: string, 
      public ouvrierNecessaireConstruction: number, 
      public tempsDeConstruction: number, 
      public coutPierreConstruction: number,  
      public coutBoisConstruction: number,  
      public coutOrConstruction: number, 
      public coutNourritureConstruction: number,
      public niveauHotelDeVilleNecessaireConstruction: number,
      public quantiteeStockagePierre: number,
      public quantiteeStockageBois: number,
      public quantiteeStockageOre: number,
      public quantiteeStockageNourriture: number,
      public apportPierreHeure: number,
      public apportBoisHeure: number,
      public apportOreHeure: number,
      public apportNourritureHeure: number
      ) {
    }
  
  }
  