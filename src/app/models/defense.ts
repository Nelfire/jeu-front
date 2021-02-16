export class Defense {
    constructor(public id: number,
        public icone: string, 
        public idTypeDefense: number,
        public typeDefense: number,
        public libelle: string,
        public description: string,
        public coutPierreConstruction: number,
        public coutBoisConstruction: number,
        public coutOrConstruction: number,
        public coutNourritureConstruction: number,
        public vie: number,
        public attaque: number,
        public bouclier: number,
        public tempsConstruction: number,
        public niveauBatimentNecessaireConstruction: number,
        public idBatimentProvenance: number) { }
}