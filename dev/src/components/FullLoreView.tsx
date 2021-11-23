import { FC } from 'react'
import { GAME_DESCRIPTION, HISTORY, WORLD_DESCRIPTION } from 'src/fixtures/game'
import { Characters } from './Characters'
import { Description } from './Description'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FullLoreView {}
export const FullLoreView: FC<FullLoreView> = () => {
  return (
    <div>
      <h1 className="p-10 text-xl">Wordbug</h1>
      <Description header="The game of Wordbug" content={GAME_DESCRIPTION} />
      <Description header="The world of Gubdrow" content={WORLD_DESCRIPTION} />
      <Description header="History" content={HISTORY} />
      <Characters />
    </div>
  )
}
