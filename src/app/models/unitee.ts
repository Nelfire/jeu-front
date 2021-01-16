export class Unitee{
    constructor(
        public id: number,
        public idTypeUnitee: number, 
        public idBatimentProvenance: number, 
        public icone: string,
        public libelle: string,
        public descriptif: string,
        public coutPierreFormation: number,
        public coutBoisFormation: number,
        public coutOrFormation: number,
        public coutNourritureFormation: number,
        public coutHumain: number,
        public tempsFormation: number,
        public vie: number,
        public attaque: number,
        public portee: number,
        public armure: number,
        public niveauBatimentNecessaireFormation: number,
        public apportRessourcePierreHeure: number,
        public apportRessourceBoisHeure: number,
        public apportRessourceOrHeure: number,
        public apportRessourceNourritureHeure: number) {}
}