import { FC } from 'react'
import {
  MYSTIC_NATION,
  NATION_OF_NORTH,
  NATION_OF_TRADERS,
} from '../../fixtures/game'
import { Description } from '../Description'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NationsViewPage {}

const nations = {
  'Nation of North': NATION_OF_NORTH,
  'Mystic Nation': MYSTIC_NATION,
  'Nation of Traders': NATION_OF_TRADERS,
}
export const NationsViewPage: FC<NationsViewPage> = () => {
  return (
    <div>
      {Object.entries(nations).map(([header, content]) => (
        <Description header={header} content={content} key={header} />
      ))}
    </div>
  )
}
