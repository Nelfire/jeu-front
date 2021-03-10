export class JoueurInfos {
  constructor(
    public id: number,
    public icone: string,
    public pseudo: string,
    public email: string,
    public descriptif: string,
    public niveau: number,
    public experience: number,
    public pierrePossession: number,
    public boisPossession: number,
    public orPossession: number,
    public nourriturePossession: number,
    public gemmePossession: number,
    public pierreMaximum: number,
    public boisMaximum: number,
    public orMaximum: number,
    public nourritureMaximum: number,
    public pierreBoostProduction: number,
    public boisBoostProduction: number,
    public orBoostProduction: number,
    public nourritureBoostProduction: number,
    public tempsDeJeu: number,
    public derniereConnexion: Date,
    public donateur: Boolean,
    public positionX: number,
    public positionY: number
  ) {

  }
}
