import { FC, ReactElement } from 'react'
import { Character } from 'src/features/select-character/types'
import { CHARACTER_DATA } from 'src/fixtures/characters'
import { h2style } from './Description'
import { Palette } from './Palette'

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
                <div className="items-center p-2 shadow-sm rounded-s">
                  <img src={char.portrait} />
                  <h2 className="font-serif text-xl bg-gray-300 shadow-sm font-large">
                    {char.name}
                  </h2>
                  <table className="mx-auto text-left pd-2">
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

                <div className="items-center p-2 shadow-sm rounded-s">
                  <Palette {...char.colors} />
                </div>
                <div className="items-center p-2 prose shadow-sm rounded-s">
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
