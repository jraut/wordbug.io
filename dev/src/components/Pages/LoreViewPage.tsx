import { FC } from 'react'
import { HISTORY } from '../../fixtures/game'
import { Description } from '../Description'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoreViewPage {}

export const LoreViewPage: FC<LoreViewPage> = () => {
  return (
    <div>
      <Description header="History" content={HISTORY} />
    </div>
  )
}
