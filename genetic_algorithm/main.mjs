import { DNA } from "./dna.mjs"
import FitnessCalculator from "./populationFitnessCalculator.mjs"
import MatingPool from "./matingPool.mjs"


export class GeneticAlgorithm {
    constructor(target = "For Farish Al Mahmud, My first born", populationSize = 5000, mutationRate = 0.01, maxItterationTollarate=100) {
        this.target = target
        this.DnaLength = target.length
        this.fitnessCalculator = new FitnessCalculator(target)
        this.populationSize = populationSize
        this.mutationRate = mutationRate
        this.population = []
        this.pool = []
        this.is_setup = false
        this.end = false
        this.itteration = 0
        this.bestFit = undefined
        this.bestFitRateList = []
        this.maxItterationTollarate = maxItterationTollarate
    }

    pushToBestFitRateList(bestFitRate) {
        if (this.bestFitRateList.length === this.maxItterationTollarate) {
            this.bestFitRateList.shift()
        }
        this.bestFitRateList.push(bestFitRate)
    }

    isBestFitUnchanged() {
        if (this.bestFitRateList.length < this.maxItterationTollarate) return false
        const bestFitRateSet = new Set(this.bestFitRateList)
        if (bestFitRateSet.size !== 1) return false
        return true
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
        for (let i = 0; i < this.populationSize; i++) {
            parent1 = pool.pickFromPool()
            parent2 = pool.pickFromPool()
            this.population[i] = parent1.giveBirth(parent2)
        }
    }

    findTheBestFit () {
        let result = this.bestFit ?? this.population[0]
        let currentFitness = result.fitness

        for (const p of this.population) {
            if (currentFitness < p.fitness) {
                currentFitness = p.fitness
                result = p
            }
        }
        this.pushToBestFitRateList(currentFitness)
        return result
    }

    runStep() {
        this.itteration += 1
        if (this.setup === false) {
            setup()
        }
        this.evaluatePulationFitness()
        this.bestFit = this.findTheBestFit()
        if (this.bestFit.fitness == 1) {
            // todo: if fitness stays same for past few itterations either terminate of increase population size
            this.end = true
        }
        else {
            this.pool = new MatingPool(this.population)
            this.fillWithNewPopulation(this.pool)
        }
    }

    bestFitStr() {
        return this.bestFit?.gense.join("") ?? "n/a"
    }

    populationStr() {
        let p = this.population.map(p => p.gense.join(""))
        return p.slice(0,50)
    }

}

// const gs = new GeneticAlgorithm()
// gs.setup()

// while (gs.end===false) {
//     gs.runStep()
//     console.log(gs.bestFitStr())
// }