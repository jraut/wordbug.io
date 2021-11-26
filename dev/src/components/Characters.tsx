import { FC, ReactElement } from 'react'
import { Alignment, CHARACTER_DATA, Family } from 'src/fixtures/characters'
import { h2style } from './Description'
import { Palette } from './Palette'

export interface Palette {
  main: string
  secondaries: string[]
}
export interface Character {
  name: string
  portrait: string
  description: string[]
  colors: Palette
  alignment: Alignment
  family: Family
}

const CharactersColorDisplay: FC<{ characters: Character[] }> = ({
  characters,
}) => {
  const swatches: ReactElement[] = []
  {
    characters.forEach(({ name, colors }) => {
      swatches.push(
        <div key={name} style={{ background: colors.main }}>
          {name}: {colors.main}
        </div>,
      )
    }, [])
  }
  return (
    <div className="my-4">
      <h2>Main colors of characters</h2>
      {swatches}
    </div>
  )
}

export const Characters: FC = () => {
  const characters = Object.values(CHARACTER_DATA)
  return (
    <div>
      <h2 className={h2style}>Characters</h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {characters.map((char) => {
          return (
            <div key={char.name} className="p-4">
              <div
                className={`mx-auto flex flex-col space-y-4 p-2 rounded-s shadow-xl ${
                  char.alignment === 'light' ? 'bg-gray-200' : 'bg-gray-400'
                }`}
              >
                <div className="p-2 rounded-s shadow-sm items-center">
                  <img src={char.portrait} />
                  <h2 className="text-xl font-large font-serif shadow-sm bg-gray-300">
                    {char.name}
                  </h2>
                  <table className="text-left mx-auto pd-2">
                    <tbody>
                      <tr>
                        <td>Alignment: </td>
                        <td>{char.alignment}</td>
                      </tr>
                      <tr>
                        <td>Family: </td>
                        <td>{char.family}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-2 rounded-s shadow-sm items-center">
                  <Palette {...char.colors} />
                </div>
                <div className="p-2 rounded-s shadow-sm items-center prose">
                  <h3>History</h3>
                  <div>
                    {char.description.map((d, i) => (
                      <p key={i}> {d}</p>
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
