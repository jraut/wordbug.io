import React from 'react'
import { CHARACTER_DATA } from 'src/fixtures/characters'
import { CharacterName } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PortraitGrid {
  setCharacter: React.Dispatch<React.SetStateAction<CharacterName | null>>
}

export const PortraitGrid: React.FC<PortraitGrid> = ({ setCharacter }) => {
  const characters = Object.values(CHARACTER_DATA)
  return (
    <div>
      <div className="grid sm:grid-cols-3 xl:grid-cols-3">
        {characters.map((char) => {
          return (
            <div key={char.name} className="p-4">
              <div
                className="cursor-pointer"
                onClick={() => setCharacter(char.name)}
              >
                <div
                  className="w-64 h-64 bg-center bg-no-repeat bg-contain rounded-md hover:border-highlight-500"
                  style={{
                    backgroundImage: `url(${char.portrait})`,
                    maxHeight: '30vh',
                  }}
                ></div>
                <img />
                {/* <button
                  className="absolute b-0 r-0"
                  onClick={() => setGameCharacter(char.name)}
                >
                  Lets play
                </button> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
