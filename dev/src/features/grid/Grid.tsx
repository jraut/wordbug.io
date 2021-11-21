import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'
import { indexToCoordinate } from 'src/components/GameArea'
import { useAppSelector } from 'src/hooks/store'
import { Pointer } from './Pointer'
import { Dimensions } from './store'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Grid {
  width: number
  height: number
  checkedIds: number[]
  blockSize: number //  length of a blocks side in pixels
  dimensions: Dimensions
}
const easings = ['ease-linear', 'ease-in', 'ease-out', 'ease-in-out']
const delays = [
  'delay-75',
  'delay-100',
  'delay-150',
  'delay-200',
  'delay-300',
  'delay-500',
  'delay-700',
  'delay-1000',
]

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Droppable {
  id: string
  dimension: number
  top: number
  left: number
  char: string
  easing: string
  delay: string
  checked: boolean
}

export const Square: FC<Droppable> = ({
  id,
  dimension,
  top,
  left,
  char,
  easing,
  delay,
  checked,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  })
  return (
    <div
      ref={setNodeRef}
      className={'flex p-1 absolute transition-positioning duration-700'}
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div
        className={`flex m-auto w-full h-full
        ${checked ? 'bg-' : 'bg-gray-300'} ${easing} ${delay}`}
      >
        <span className="m-auto">{char}</span>
      </div>
    </div>
  )
}

const nEasings = easings.length
const nDelays = delays.length
export const Grid: FC<Grid> = ({
  dimensions,
  width,
  height,
  checkedIds,
  blockSize,
}) => {
  const characters = useAppSelector((store) => store.grid.characters)
  return (
    <>
      <div
        className="flex flex-wrap relative inset-o mx-auto transition-width ease-in-out duration-700  overscroll-none"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Pointer />
        {characters.map((char, i) => {
          const [left, top] = indexToCoordinate(i, dimensions)
          const easing = easings[i % nEasings]
          const delay = delays[i % nDelays]
          const checked = checkedIds.includes(i)
          return (
            <Square
              key={i}
              id={String(i)}
              dimension={blockSize}
              top={top * blockSize}
              left={left * blockSize}
              char={char}
              easing={easing}
              delay={delay}
              checked={checked}
            ></Square>
          )
        })}
      </div>
    </>
  )
}
