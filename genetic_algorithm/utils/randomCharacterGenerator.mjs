import {getRandomIntInclusive} from './randomInt.mjs'

export default function randomCharacter() {
    let c = getRandomIntInclusive(32,127)
    return String.fromCharCode(c)
}

// console.log(randomCharacter())