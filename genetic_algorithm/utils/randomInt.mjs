export function getRandomIntInclusive(min=0, max=1) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

export function getRandomNumberInclusive(min=0, max=1) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.random() * (maxFloored - minCeiled) + minCeiled;
}

// console.log(getRandomIntInclusive(0,5))