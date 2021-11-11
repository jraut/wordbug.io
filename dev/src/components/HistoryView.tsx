import { FC } from 'react'
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
