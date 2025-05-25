import { DNA } from "./dna.mjs"
import FitnessCalculator from "./populationFitnessCalculator.mjs"
import MatingPool from "./matingPool.mjs"

let mutationRate = 0.01
let populationSize = 100
let population = []
const target = "faris al mahmud"
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

function doBreak() {
    for (const p of population) {
        if(p.gense[0] == 'o' && p.gense[1] == 'k') {console.log(`found you ${p.gense} with fitness ${p.fitness}`);return true}
    }
    return false
}

setup()

while (true) {
    evaluatePulationFitness()
    let bestFit = findTheBestFit()
    console.log(bestFit.gense)
    if (bestFit.fitness == 1) {
        break
    }
    // if (doBreak()) break
    let pool = new MatingPool(population)
    fillWithNewPopulation(pool)
}
