import { FC } from 'react'
import { Word } from 'src/features/grid/store'
import { useAppSelector } from 'src/hooks/store'
import { indexToCoordinate } from './GameArea'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DrawLine {
  checkedIds: Word
  width: number
  height: number
  blockSize: number
}

const lastBlockDeviation = 10
const lastBlockDeviationInit = (lastBlockDeviation / 2) * -1

export const DrawLine: FC<DrawLine> = ({
  checkedIds,
  width,
  height,
  blockSize,
}) => {
  const dimensions = useAppSelector((store) => store.grid.dimensions)
  if (checkedIds.length > 0) {
    const halfBlock = blockSize / 2
    const curvePath = checkedIds
      .map((id, i) => {
        const [x, y] = indexToCoordinate(id, dimensions)
        if (i === 0) {
          const initialX = x * blockSize + halfBlock
          const initialY = y * blockSize + halfBlock
          return `M ${initialX} ${initialY}`
        } else {
          const [_xPrev, _yPrev] = indexToCoordinate(
            checkedIds[i - 1],
            dimensions,
          )
          const xPrev = _xPrev * blockSize + halfBlock
          const yPrev = _yPrev * blockSize + halfBlock
          const xCur = x * blockSize + halfBlock
          const yCur = y * blockSize + halfBlock
          // last segment
          if (i === checkedIds.length - 1) {
            return `Q ${xPrev} ${yPrev}, ${
              xCur +
              (lastBlockDeviationInit + lastBlockDeviation * Math.random())
            } ${
              yCur +
              (lastBlockDeviationInit + lastBlockDeviation * Math.random())
            }`
          }
          return `Q ${xPrev} ${yPrev}, ${(xPrev + xCur) / 2} ${
            (yPrev + yCur) / 2
          }`
        }
      })
      .join(' ')
    return (
      <svg
        className="absolute z-10 pointer-events-none full-w full-h"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={curvePath}
          stroke="rgba(0,0,0,0.333)"
          strokeWidth={3}
          fill="transparent"
        />
      </svg>
    )
  } else {
    return null
  }
}
