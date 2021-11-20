import { FC } from 'react'
import { Word } from 'src/features/grid/store'
import { indexToCoordinate } from './GameArea'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DrawLine {
  checkedIds: Word
  width: number
  height: number
  dimensions: [number, number]
  blockSize: number
}

export const DrawLine: FC<DrawLine> = ({
  checkedIds,
  width,
  height,
  dimensions,
  blockSize,
}) => {
  if (checkedIds.length > 0) {
    const halfBlock = blockSize / 2
    const [_initialX, _initialY] = indexToCoordinate(checkedIds[0], dimensions)
    const initialX = _initialX * blockSize + halfBlock
    const initialY = _initialY * blockSize + halfBlock
    const curvePath = `M ${initialX} ${initialY} Q ${initialX} ${initialY}, ${initialX} ${initialY} ${checkedIds
      .slice(1)
      .map((id) => {
        const [x, y] = indexToCoordinate(id, dimensions)
        return `T ${x * blockSize + halfBlock} ${y * blockSize + halfBlock}`
      })
      .join(' ')}`
    return (
      <svg
        className="absolute full-w full-h pointer-events-none z-10"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="20" fill="red" />
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
