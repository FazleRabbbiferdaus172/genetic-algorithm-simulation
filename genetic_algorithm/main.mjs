import { DNA } from "./dna.mjs"
import FitnessCalculator from "./populationFitnessCalculator.mjs"
import MatingPool from "./matingPool.mjs"

let mutationRate = 0.01
let populationSize = 100
let population = []
let pool = []
const target = "Faris Al Mahmud"
const DnaLength = target.length

DNA.mutationRate = mutationRate
// console.log(DNA.mutationRate)

const fitnessCalculator = new FitnessCalculator(target)

function setup() {
    for (let i = 0; i<populationSize; i++) {
        let creature = new DNA(DnaLength, fitnessCalculator)
        creature.fillGenes()
        population.push(creature)
    }
}

function evaluatePulationFitness() {
    for (const p of population) {
        p.calculateFitness()
    }
}

function fillWithNewPopulation(pool) {
    for (let i = 0; i < populationSize; i++) {
        let parent1 = pool.pickFromPool()
        let parent2 = pool.pickFromPool()
        population[i] = parent1.giveBirth(parent2)
    }
}

function findTheBestFit () {
    let result = population[0]
    let currentFitness = result.fitness

    for (const p of population) {
        if (currentFitness < p.fitness) {
            currentFitness = p.fitness
            result = p
        }
    }
    return result
}


function runStep(population=[], pool=[]) {
    if (population.length === 0) {
        setup()
    }
    evaluatePulationFitness()
    let bestFit = findTheBestFit()
    if (bestFit.fitness == 1) {
        return {end: true, bestFit: bestFit, population: population, pool: pool}
    }
    else {
        pool = new MatingPool(population)
        fillWithNewPopulation(pool)
        return {end: false, bestFit: bestFit, population: population, pool: pool}
    }

}

while (true) {
    let state = runStep(population, pool)
    population = state.population
    pool = state.pool
    console.log(state.bestFit.gense)
    if (state.end) {
        break
    }
}


// const GeneticAlgorithm = {

// }