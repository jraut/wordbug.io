import { GAME_DESCRIPTION, HISTORY } from '../fixtures/game'
import { Description } from './Description'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HistoryView {}

export const HistoryView: FC<HistoryView> = () => {
  return (
    <div>
      <Description header="History" content={HISTORY} />
    </div>
  )
}

import { Characters } from './Characters'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharactersView {}

export const CharactersView: FC<CharactersView> = () => {
  return (
    <div>
      <Characters />
    </div>
  )
}
