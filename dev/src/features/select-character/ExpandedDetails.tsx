import React from 'react'
import { useDispatch } from 'react-redux'
import { Palette } from 'src/components/Palette'
import { CHARACTER_DATA } from 'src/fixtures/characters'
import { setGameCharacter } from '../game/store'
import { CharacterName } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExpandedDetails {
  characterName: CharacterName
  setCharacter: React.Dispatch<React.SetStateAction<CharacterName | null>>
}

export const ExpandedDetails: React.FC<ExpandedDetails> = ({
  characterName,
  setCharacter,
}) => {
  const dispatch = useDispatch()
  const character = CHARACTER_DATA[characterName]
  return (
    <div className="relative">
      <button onClick={() => setCharacter(null)}>Close</button>
      <div key={character.name} className="p-4">
        <div
          className={`mx-auto flex flex-col space-y-4 p-2 rounded-s shadow-xl ${
            character.alignment === 'light' ? 'bg-gray-200' : 'bg-gray-400'
          }`}
        >
          <div className="p-2 rounded-s shadow-sm items-center">
            <img src={character.portrait} />
            <h2 className="text-xl font-large font-serif shadow-sm bg-gray-300">
              {character.name}
            </h2>
            <table className="text-left mx-auto pd-2">
              <tbody>
                <tr>
                  <td>Alignment: </td>
                  <td>{character.alignment}</td>
                </tr>
                <tr>
                  <td>Family: </td>
                  <td>{character.family}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-2 rounded-s shadow-sm items-center">
            <Palette {...character.colors} />
          </div>

          <button onClick={() => dispatch(setGameCharacter(character.name))}>
            Pick character
          </button>

          <div className="p-2 rounded-s shadow-sm items-center prose">
            <h3>History</h3>
            <div>
              {character.description.map((d, i) => (
                <p key={i}> {d}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
