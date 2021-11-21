import { GAME_DESCRIPTION } from 'src/fixtures/game'
import { FC, useEffect } from 'react'
import { Description } from '../Description'
import { GameArea } from '../GameArea'
import { useAppDispatch } from 'src/hooks/store'
import { setLevel } from 'src/features/game/store'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameViewPage {}

export const GameViewPage: FC<GameViewPage> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setLevel(1))
  }, [])
  return (
    <div>
      <Description header="The game of Wordbug" content={GAME_DESCRIPTION} />
      <div>
        <GameArea />
      </div>
    </div>
  )
}
