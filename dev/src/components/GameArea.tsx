import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties, FC, useState } from 'react'
import { Grid } from './Grid'

export type CornerModifier = 1 | -1 | 0
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DraggableCorner {
  id: string
  sstyle?: CSSProperties
}

export interface Coordinates {
  x: number
  y: number
}

export const DraggableCorner: FC<DraggableCorner> = ({ id, sstyle }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    attributes: {
      roleDescription: 'grid resize handler',
    },
  })
  const style = { transform: CSS.Translate.toString(transform) }

  return (
    <div
      style={{ ...style, ...sstyle }}
      className="absolute"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      dragme
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GameArea {}

const resizeFactors: Record<string, [CornerModifier, CornerModifier]> = {
  t: [0, 1],
  tr: [1, 1],
  r: [1, 0],
  br: [1, -1],
  b: [0, -1],
  bl: [-1, -1],
  l: [-1, 0],
  tl: [-1, 1],
}

export const GameArea: FC<GameArea> = () => {
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(800)
  const { setNodeRef } = useDroppable({ id: 'game-area' })
  const resizeHandler = (e: DragEndEvent): void => {
    const { active, delta } = e
    const { x, y } = delta
    const { id } = active
    const [factorX, factorY] = resizeFactors[id] || [1, 1]
    setWidth(width + 2 * x * factorX)
    setHeight(height + 2 * y * factorY)
  }

  return (
    <div
      className="flex"
      ref={setNodeRef}
      onDragEnd={(e) => {
        console.log(e)
      }}
    >
      {' '}
      <DndContext onDragEnd={resizeHandler}>
        <div className="relative mx-auto transition-spacing">
          <DraggableCorner id="tr" sstyle={{ right: '-3em' }} />
          <DraggableCorner id="tl" sstyle={{ left: '-3em' }} />
          <Grid
            characters={Array.from(Array(200)).map((_, i) => String(i % 10))}
            width={width}
            height={800}
          />
        </div>
      </DndContext>
    </div>
  )
}
