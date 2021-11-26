import React, { useState } from 'react'
import { ExpandedDetails } from './ExpandedDetails'
import { PortraitGrid } from './PortraitGrid'
import { CharacterName } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharacterSelectView {}

export const CharacterSelectView: React.FC<CharacterSelectView> = () => {
  const [characterDisplayed, setCharacterDisplayed] =
    useState<CharacterName | null>(null)

  return (
    <div>
      {characterDisplayed ? (
        <ExpandedDetails
          characterName={characterDisplayed}
          setCharacter={setCharacterDisplayed}
        />
      ) : (
        <PortraitGrid setCharacter={setCharacterDisplayed} />
      )}{' '}
    </div>
  )
}
