import { FC, useEffect } from 'react'
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
    <div className="relative">
      <GameArea />
    </div>
  )
}
