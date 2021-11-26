import React from 'react'
import { useDispatch } from 'react-redux'
import { h1style } from 'src/components/Description'
import { CHARACTER_DATA } from 'src/fixtures/characters'
import { setGameCharacter } from '../game/store'
import { CharacterName } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PortraitGrid {
  setCharacter: React.Dispatch<React.SetStateAction<CharacterName | null>>
}

export const PortraitGrid: React.FC<PortraitGrid> = ({ setCharacter }) => {
  const dispatch = useDispatch()
  const characters = Object.values(CHARACTER_DATA)
  return (
    <div>
      <h2 className={h1style}>Characters</h2>
      <div className="grid sm:grid-cols-3 xl:grid-cols-3">
        {characters.map((char) => {
          return (
            <div
              key={char.name}
              className="p-4"
              onClick={() => dispatch(setCharacter(char.name))}
            >
              <img src={char.portrait} />
              <button
                className="absolute b-0 r-0"
                onClick={() => setGameCharacter(char.name)}
              >
                Lets play
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
