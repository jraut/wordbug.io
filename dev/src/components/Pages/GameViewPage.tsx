import { GAME_DESCRIPTION } from 'src/fixtures/game'
import { FC } from 'react'
import { Description } from '../Description'
import { GameArea } from '../GameArea'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameViewPage {}

export const GameViewPage: FC<GameViewPage> = () => {
  return (
    <div>
      <Description header="The game of Wordbug" content={GAME_DESCRIPTION} />
      <div>
        <GameArea />
      </div>
    </div>
  )
}
