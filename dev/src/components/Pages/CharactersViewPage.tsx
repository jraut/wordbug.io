import { Characters } from '../Characters'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CharactersViewPage {}

export const CharactersViewPage: FC<CharactersViewPage> = () => {
  return (
    <div>
      <Characters />
    </div>
  )
}
