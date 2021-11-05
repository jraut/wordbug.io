import React from 'react'
import { CHARACTER_DATA } from '../fixtures/characters'
import { Palette } from './Palette'

export interface Palette {main: string, secondaries: string[]}
export interface Character {
  name: string
  description: string[]
  colors: Palette
}

export interface DraftCharacter extends Omit<Character, 'colors'> {
  name: string
  description: string[]
  colorsLight: {main: string, secondaries: string[]}
  colorsDark: {main: string, secondaries: string[]}
}

export const Characters: React.FC = () => {
  const characters = CHARACTER_DATA
  return (
    <div>
      <h1>Characters</h1>
      {characters.map((char) => {
        return (
          <div key={char.name}>
            <h2>{char.name}</h2>
            <Palette {...char.colorsLight} />
            <Palette {...char.colorsDark} />
            <div>
              {char.description.map((d, i) => (
                <p
                  key={i}
                  style={{
                    textAlign: 'left',
                    maxWidth: '18em',
                    margin: 'auto',
                    paddingBottom: '1em',
                  }}
                >
                  {' '}
                  {d}
                </p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
