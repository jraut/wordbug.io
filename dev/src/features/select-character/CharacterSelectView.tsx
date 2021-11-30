import React, { useState } from 'react'
import { h1style } from 'src/components/Description'
import { ExpandedDetails } from './ExpandedDetails'
import { PortraitGrid } from './PortraitGrid'
import { CharacterName } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharacterSelectView {}

export const CharacterSelectView: React.FC<CharacterSelectView> = () => {
  const [characterDisplayed, setCharacterDisplayed] =
    useState<CharacterName | null>(null)

  return (
    <div className="relative flex w-screen h-screen">
      <>
        <div
          className={`absolute transition-area z-10 w-full bg-gray-800 opacity-70 ${
            characterDisplayed ? 'h-screen' : 'h-0'
          }`}
          onClick={() => setCharacterDisplayed(null)}
        >
          &nbsp;
        </div>
        <div className="absolute z-20 w-full h-full pointer-events-none">
          <div className="max-w-md m-auto pointer-events-auto transition-area">
            {characterDisplayed && (
              <ExpandedDetails
                characterName={characterDisplayed}
                setCharacter={setCharacterDisplayed}
              />
            )}
          </div>
        </div>
      </>
      <div className="max-w-6xl p-4 m-auto bg-gray-400 rounded-xl">
        <h2 className={h1style}>Choose a character</h2>
        <PortraitGrid setCharacter={setCharacterDisplayed} />
      </div>
    </div>
  )
}
