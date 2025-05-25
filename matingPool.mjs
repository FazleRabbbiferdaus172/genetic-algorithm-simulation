import { getRandomIntInclusive } from "./utils/randomInt.mjs"

class MatingPool{
    constructor () {
        this.pool = []
        this.parents = []
    }

    generatePool() {
        for (const p of this.parents) {
            for (let i = 0; i < Math.floor(p.fitness*100); i++) {
                this.pool.push(p)
            }
        }        
    }

    pickFromPool() {
        if (this.pool.length === 0) this.generatePool()
        return this.pool[getRandomIntInclusive(0, this.pool.length - 1)]
    }
}