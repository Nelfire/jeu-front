import { TypeJourFerme } from './type-jour-ferme';

export class JourFermeVisualisation {
	constructor(public id: number, public date: Date, public type: TypeJourFerme,  public statut: string, public commentaire: string) {
	}
}
