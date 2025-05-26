import randomCharacter from "./utils/randomCharacterGenerator.mjs";
import { getRandomIntInclusive, getRandomNumberInclusive } from "./utils/randomInt.mjs";

export class DNA{
    static mutationRate

    constructor (length, fitnessCalculator) {
        this.length = length
        this.gense = []
        this.fitnessCalculator = fitnessCalculator
        this.fitness = 0
    }

    fillGenes() {
        for (let i = 0; i < this.length; i++) {
            this.gense[i] = randomCharacter();
        }
    }

    calculateFitness() {
        this.fitness = this.fitnessCalculator.getFitness(this)
    }

    crossover(anotherParent) {
        let child = new DNA(this.length, this.fitnessCalculator)
        let mid = getRandomIntInclusive(0, this.length - 1)
        child.gense = this.gense.slice(0, mid)
        let otherPart = anotherParent.gense.slice(mid, this.length)
        child.gense = [...child.gense, ...otherPart]
        return child
    }

    mutate() {
        for (let i=0; i < this.length; i++) {
            if (getRandomNumberInclusive(0, 1) < DNA.mutationRate) {
                this.gense[i] = randomCharacter()
            }
        }
    }

    giveBirth(otherParent) {
        let child = this.crossover(otherParent)
        child.mutate()
        return child
    }

}

// let a = new DNA(5)
// a.fillGenes()
// console.log(a)
// let b = new DNA(5)
// b.fillGenes()
// console.log(b)
// console.log(a.crossover(b))
