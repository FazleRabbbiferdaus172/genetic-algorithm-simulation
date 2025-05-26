import { DNA } from "./dna.mjs"
import FitnessCalculator from "./populationFitnessCalculator.mjs"
import MatingPool from "./matingPool.mjs"

let mutationRate = 0.01
let populationSize = 100
let population = []
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


setup()

let main_div = document.getElementById('main-div');

if (main_div === null) {
    main_div = document.createElement("div");
    main_div.id = 'main-div';
    document.body.appendChild(main_div);
}

while (true) {
    evaluatePulationFitness()
    let bestFit = findTheBestFit()
    const h3 = document.createElement("h3");
    h3.innerHTML = bestFit.gense.join("");
    main_div.appendChild(h3);
    console.log(bestFit.gense)
    if (bestFit.fitness == 1) {
        break
    }
    // if (doBreak()) break
    let pool = new MatingPool(population)
    fillWithNewPopulation(pool)
}
