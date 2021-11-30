import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'

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
  const colorWhenChecked = checked ? '' : 'bg-gray-300 text-gray-800'
  return (
    <div
      ref={setNodeRef}
      className={'flex absolute p-1 duration-700 transition-positioning'}
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
        top: `${top}px`,
        left: `${left}px`,
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
