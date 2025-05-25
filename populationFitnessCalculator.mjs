export default class FitnessCalculator {
    constructor(target) {
        this.target = target
    }

    getFitness(model) {
        let fitness = 0
        for (let i = 0; i < this.target.length; i++) {
            if (model.gense[i] === this.target[i]) fitness++
        }

        return fitness/this.target.length
    }
}