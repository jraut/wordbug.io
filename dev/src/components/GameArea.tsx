import { FC } from 'react'
import { Grid } from './Grid'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameArea {}

export const GameArea: FC<GameArea> = () => {
  return (
    <div>
      <Grid
        characters={Array.from(Array(600)).map((_, i) => String(i % 10))}
        width={600}
        height={2000}
      />
    </div>
  )
}
