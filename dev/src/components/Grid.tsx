import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'
import { Pointer } from './grid/Pointer'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Grid {
  characters: string[]
  width: number
  height: number
  checkedIds: number[]
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
export const Grid: FC<Grid> = ({ characters, width, height, checkedIds }) => {
  const nx = Math.ceil(Math.sqrt((characters.length * width) / height))
  let ny = Math.ceil(Math.sqrt((characters.length * height) / width))

  if (nx * (ny - 1) > characters.length) {
    ny = ny - 1
  }
  const blockDimension = Math.min(width / nx, height / ny)

  return (
    <>
      <div
        className="flex flex-wrap relative inset-o mx-auto transition-width ease-in-out duration-700"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Pointer />
        {characters.map((char, i) => {
          const easing = easings[i % nEasings]
          const delay = delays[i % nDelays]
          const checked = checkedIds.includes(i)
          return (
            <Square
              key={i}
              id={String(i)}
              dimension={blockDimension}
              top={
                blockDimension *
                Math.floor(i / Math.ceil(characters.length / ny))
              }
              left={blockDimension * (i % nx)}
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
