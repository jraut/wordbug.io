import React, { ReactElement } from 'react'
import { Alignment, CHARACTER_DATA, Family } from '../fixtures/characters'
import { Palette } from './Palette'

export interface Palette {main: string, secondaries: string[]}
export interface Character {
  name: string
  description: string[]
  colors: Palette
  alignment: Alignment
  family: Family
}

const CharactersColorDisplay: React.FC<{ characters: Character[] }> = ({ characters }) => {
  const swatches: ReactElement[] = []
  { characters.forEach(
    ({ name, colors }) => {
      swatches.push(<div style={{ background: colors.main }}>{name}:{' '}{colors.main}</div>)
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
            <p>Alignment: {char.alignment}</p>
            <p>Family: {char.family}</p>
            <h3>Colours</h3>
            <Palette {...char.colors} />
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
