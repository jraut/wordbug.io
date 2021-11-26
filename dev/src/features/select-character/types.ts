export type Family = 'wolf' | 'squirrel' | 'lizard' | 'mystery'
export type Alignment = 'light' | 'dark'
export type CharacterName =
  | 'Saash'
  | 'Rugo'
  | 'Aerith'
  | 'Celso'
  | 'Theodorus'
  | 'Mira'

export interface Palette {
  main: string
  secondaries: string[]
}

export interface Character {
  name: CharacterName
  portrait: string
  description: string[]
  colors: Palette
  alignment: Alignment
  family: Family
}
