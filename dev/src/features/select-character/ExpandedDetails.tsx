import React from 'react'
import { useDispatch } from 'react-redux'
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
      <button
        className="absolute p-2 m-3 top-2 right-2"
        onClick={() => setCharacter(null)}
      >
        X
      </button>
      <div key={character.name} className="p-4 max-h-96">
        <div className="flex flex-col p-2 pt-6 mx-auto space-y-4 bg-gray-400 rounded-md shadow-xl">
          <div
            className="flex-shrink-0 m-auto bg-center bg-no-repeat bg-contain rounded-md w-80 h-80"
            style={{
              backgroundImage: `url(${character.portrait})`,
              maxHeight: '30vh',
            }}
          ></div>
          <h2 className="font-serif text-xl text-gray-800 shadow-sm font-large">
            {character.name}
          </h2>
          {/* 
          <div className="items-center p-2 shadow-sm rounded-s">
            <Palette {...character.colors} />
          </div> */}

          <button
            onClick={() => dispatch(setGameCharacter(character.name))}
            className="p-8 m-4 text-2xl font-bold text-gray-800 bg-gray-200 rounded-md"
          >
            Pick character and Play!
          </button>

          <div className="items-center p-2 overflow-scroll prose shadow-sm rounded-s">
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
