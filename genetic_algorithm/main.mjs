import { DNA } from "./dna.mjs"
import FitnessCalculator from "./populationFitnessCalculator.mjs"
import MatingPool from "./matingPool.mjs"

//let mutationRate = 0.01
//let populationSize = 100
//let population = []
//let pool = []
//const target = "Faris Al Mahmud"
//const DnaLength = target.length
//DNA.mutationRate = mutationRate
// console.log(DNA.mutationRate)


//function setup() {
//    for (let i = 0; i<populationSize; i++) {
//        let creature = new DNA(DnaLength, fitnessCalculator)
//        creature.fillGenes()
//        population.push(creature)
//    }
//}

//function evaluatePulationFitness() {
//    for (const p of population) {
//        p.calculateFitness()
//    }
//}

//function fillWithNewPopulation(pool) {
//    for (let i = 0; i < populationSize; i++) {
//        let parent1 = pool.pickFromPool()
//        let parent2 = pool.pickFromPool()
//        population[i] = parent1.giveBirth(parent2)
//    }
//}

// function findTheBestFit () {
//    let result = population[0]
//    let currentFitness = result.fitness

//    for (const p of population) {
//        if (currentFitness < p.fitness) {
//            currentFitness = p.fitness
//            result = p
//        }
//    }
//    return result
//}



//while (true) {
//    let state = runStep(population, pool)
//    population = state.population
//    pool = state.pool
//    console.log(state.bestFit.gense)
//    if (state.end) {
//        break
//    }
//}


class GeneticAlgorithm {
    constructor(target = "Farish Al Mahmud", populationSize = 100, mutationRate = 0.01, ) {
        this.target = target
        this.DnaLength = target.length
        this.fitnessCalculator = FitnessCalculator(target)
        this.populationSize = populationSize
        this.mutationRate = mutationRate
        this.population = []
        this.pool = []
        this.is_setup = false
        this.end = false
        this.itteration = 0
        this.bestFit = undefined
    }

    setup() {
        DNA.mutationRate = this.mutationRate
        for (let i = 0; i< this.populationSize; i++) {
            let creature = new DNA(this.DnaLength, this.fitnessCalculator)
            creature.fillGenes()
            this.population.push(creature)
        }
        this.is_setup = true        
    }
    
    evaluatePulationFitness() {
        for (const p of this.population) {
            p.calculateFitness()
        }
    }

    fillWithNewPopulation(pool) {
        let parent1;
        let parent2;
        for (let i = 0; i < populationSize; i++) {
            parent1 = pool.pickFromPool()
            parent2 = pool.pickFromPool()
            this.population[i] = parent1.giveBirth(parent2)
        }
    }

    findTheBestFit () {
        let result = this.bestFit ?? population[0]
        let currentFitness = result.fitness

        for (const p of this.population) {
            if (currentFitness < p.fitness) {
                currentFitness = p.fitness
                result = p
            }
        }
        return result
    }

    runStep() {
        this.itteration += 1
        if (this.population.length === 0) {
            setup()
        }
        evaluatePulationFitness()
        this.bestFit = findTheBestFit()
        if (this.bestFit.fitness == 1) {
            this.end = true
            // return {end: true, bestFit: bestFit, population: this.population, pool: this.pool}
        }
        else {
            this.pool = new MatingPool(this.population)
            fillWithNewPopulation(this.pool)
        }
        this.population = population
        this.pool = pool       
    }

}