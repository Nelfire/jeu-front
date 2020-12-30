import { TypeJourFerme } from './type-jour-ferme';

export class JourFermeAjout {
	constructor(public date: Date, public type: TypeJourFerme, public commentaire: string) {
	}
}
