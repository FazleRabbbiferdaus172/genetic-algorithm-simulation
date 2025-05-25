export default class FitnessCalculator {
    constructor(target) {
        this.target = target
    }

    getFitness(model) {
        let fitness = 0
        for (let i = 0; i < this.target.lenght; i++) {
            if (model.genes[i] === this.target[i]) fitness++
        }

        return fitness/this.target.lenght
    }
}