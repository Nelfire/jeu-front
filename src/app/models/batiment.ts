export class Batiment {
    constructor(public id: number,
      public icone: string, 
      public libelle: string, 
      public descriptif: string, 
      public ouvrierNecessaireConstruction: number, 
      public tempsDeConstruction: number, 
      public coutPierreConstruction: number,  
      public coutBoisConstruction: number,  
      public coutOrConstruction: number, 
      public coutNourritureConstruction: number,
      public niveauHotelDeVilleNecessaireConstruction: number
      ) {
    }
  
  }
  