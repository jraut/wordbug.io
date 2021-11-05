import React, { ReactElement } from 'react'
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

const CharactersColorDisplay: React.FC<{ characters: DraftCharacter[] }> = ({ characters }) => {
  const swatches: ReactElement[] = []
  { characters.forEach(
    ({ name, colorsLight, colorsDark }) => {
      swatches.push(<div style={{ background: colorsLight.main }}>{colorsLight.main}&nbsp;{name} Light</div>)
      swatches.push(<div style={{ background: colorsDark.main }}>{colorsDark.main}&nbsp;{name} Dark</div>)
      
    }
    , []) }
  return (<div>
  <h2>Main colors of characters</h2>
  {swatches}

    </div>)
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

            <h3>Light colours</h3>
            <Palette {...char.colorsLight} />
            <h3>Dark colours</h3>
            <Palette {...char.colorsDark} />
            <h3>History</h3>
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
      <CharactersColorDisplay characters={characters} />
    </div>
  )
}
