import { getRandomIntInclusive } from "./utils/randomInt.mjs"

export default class MatingPool{
    constructor (parents) {
        this.pool = []
        this.parents = parents
    }

    generatePool() {
        if (this.parents === 0) throw new Error("No parents")
        for (const p of this.parents) {
            if (Math.floor(p.fitness*100) === 0) {
                this.pool.push(p)
            } 
            else {
            for (let i = 0; i < Math.floor(p.fitness*100); i++) {
                this.pool.push(p)
            }
        }
        }        
    }

    pickFromPool() {
        if (this.pool.length === 0) this.generatePool()
        return this.pool[getRandomIntInclusive(0, this.pool.length - 1)]
    }
}