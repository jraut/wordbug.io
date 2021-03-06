import { FC, useEffect } from 'react'
import { GameArea } from '../GameArea'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'
import { setLevel } from 'src/features/game/store'
import { CharacterSelectView } from 'src/features/select-character/CharacterSelectView'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameViewPage {}

export const GameViewPage: FC<GameViewPage> = () => {
  const characterName = useAppSelector((store) => store.game.character)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setLevel(1))
  }, [])
  return (
    <div className="overflow-y-auto overflow-x-hidden relative h-screen text-white bg-gray-700">
      {characterName ? <GameArea /> : <CharacterSelectView />}
    </div>
  )
}
