import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'
import { indexToCoordinate } from 'src/components/GameArea'
import { useAppSelector } from 'src/hooks/store'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Droppable {
  id: string
  dimension: number
  char: string
  easing: string
  delay: string
  checked: boolean
}

export const Square: FC<Droppable> = ({
  id,
  dimension,
  char,
  easing,
  delay,
  checked,
}) => {
  const dimensions = useAppSelector((store) => store.grid.dimensions)

  const { setNodeRef } = useDroppable({
    id,
  })

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
