import React from 'react'
import { GAME_DESCRIPTION, HISTORY } from '../fixtures/game'
import { Description } from './Description'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HistoryView {}

export const HistoryView: React.FC<HistoryView> = () => {
  return (
    <div>
      <Description header="History" content={HISTORY} />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameView {}

export const GameView: React.FC<GameView> = () => {
  return (
    <div>
      <Description header="The game of Wordbug" content={GAME_DESCRIPTION} />
    </div>
  )
}

import { Characters } from './Characters'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharactersView {}

export const CharactersView: React.FC<CharactersView> = () => {
  return (
    <div>
      <Characters />
    </div>
  )
}
