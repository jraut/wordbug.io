import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'
import { indexToCoordinate } from 'src/components/GameArea'
import { useAppSelector } from 'src/hooks/store'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Droppable {
  id: string
  dimension: number
  char: string
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

const nEasings = easings.length
const nDelays = delays.length

export const Square: FC<Droppable> = ({ id, dimension, char }) => {
  const dimensions = useAppSelector((store) => store.grid.dimensions)
  const checked = useAppSelector((store) => store.grid.checkedIds[id])

  const { setNodeRef } = useDroppable({
    id,
  })
  const i = Number(id)
  const easing = easings[i % nEasings]
  const delay = delays[i % nDelays]

  const [left, top] = indexToCoordinate(Number(id), dimensions)
  const colorWhenChecked = checked ? '' : 'bg-gray-300 text-gray-800'
  return (
    <div
      ref={setNodeRef}
      className={'flex absolute p-1 duration-700 transition-positioning'}
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
        top: `${top * dimension}px`,
        left: `${left * dimension}px`,
      }}
    >
      <div
        className={`flex m-auto w-full h-full
        ${colorWhenChecked} ${easing} ${delay}`}
      >
        <span className="m-auto">{char}</span>
      </div>
    </div>
  )
}
