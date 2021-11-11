import { FC } from 'react'
import { Description } from '../Description'
import { GAME_DESCRIPTION } from '../../fixtures/game'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameViewPage {}

export const GameViewPage: FC<GameViewPage> = () => {
  return (
    <div>
      <Description header="The game of Wordbug" content={GAME_DESCRIPTION} />
    </div>
  )
}