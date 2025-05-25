import randomCharacter from "./utils/randomCharacterGenerator.mjs";

export class DNA{
    constructor (length) {
        this.length = length
        this.gense = []
    }

    fillGenes() {
        for (let i = 0; i < this.length; i++) {
            this.gense[i] = randomCharacter();
        }
    }

}