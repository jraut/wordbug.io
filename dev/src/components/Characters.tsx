import React, { ReactElement } from 'react'
import { Alignment, CHARACTER_DATA, Family } from '../fixtures/characters'
import { Palette } from './Palette'

export interface Palette {
  main: string
  secondaries: string[]
}
export interface Character {
  name: string
  description: string[]
  colors: Palette
  alignment: Alignment
  family: Family
}

const CharactersColorDisplay: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  const swatches: ReactElement[] = []
  {
    characters.forEach(({ name, colors }) => {
      swatches.push(
        <div style={{ background: colors.main }}>
          {name}: {colors.main}
        </div>,
      )
    }, [])
  }
  return (
    <div>
      <h2>Main colors of characters</h2>
      {swatches}
    </div>
  )
}

export const Characters: React.FC = () => {
  const characters = CHARACTER_DATA
  return (
    <div>
      <h1 className="text-xl font-large text-black">Characters</h1>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {characters.map((char) => {
          return (
            <div key={char.name} className="p-4">
              <div className="mx-auto flex flex-col space-y-4 p-2 rounded-s shadow-xl  bg-gray-300">
                <div className="p-2 rounded-s shadow-sm items-center">
                  <h2 className="text-xl font-large font-serif shadow-sm bg-gray-200">
                    {char.name}
                  </h2>
                  <table className="text-left mx-auto pd-2">
                    <tr>
                      <td>Alignment: </td>
                      <td>{char.alignment}</td>
                    </tr>
                    <tr>
                      <td>Family: </td>
                      <td>{char.family}</td>
                    </tr>
                  </table>
                </div>

                <div className="p-2 rounded-s shadow-sm items-center">
                  <Palette {...char.colors} />
                </div>
                <div className="p-2 rounded-s shadow-sm items-center">
                  <h3>History</h3>
                  <div>
                    {/* style={{ display: 'flex' }}> */}
                    {char.description.map((d, i) => (
                      <p
                        key={i}
                        className="max-w-sm mx-auto p-2 font-serif text-left"
                      >
                        {' '}
                        {d}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <CharactersColorDisplay characters={characters} />
    </div>
  )
}
