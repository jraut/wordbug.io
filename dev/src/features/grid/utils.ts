// weightedRand2({0:0.8, 1:0.1, 2:0.1}); // random in distribution...

import Prando from 'prando'
import { CharFreq, orderedCharFrequencies } from './assets'

// Create a deterministic random character generator
export const weightedRandom = (
  items: CharFreq[],
  seed = 'seed',
): (() => string) => {
  const rng = new Prando(seed)
  return () => {
    let sum = 0
    const rand = rng.next()
    for (const item of items) {
      const [char, w] = item
      sum += w
      if (rand < sum) return char
    }
    return ''
  }
}

export const generateCharacters = (
  seed = 'seed',
  charAmount = 120,
): string[] => {
  const generator = weightedRandom(orderedCharFrequencies, seed)
  return Array.from(Array(charAmount)).map(() => generator().toUpperCase())
}
