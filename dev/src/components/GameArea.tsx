import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDraggable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties, FC, useState } from 'react'
import { Grid } from './Grid'
import { snapCenterToCursor } from './grid/Pointer'

export type CornerModifier = 1 | -1 | 0
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DraggableCorner {
  id: string
  style?: CSSProperties
}

export interface Coordinates {
  x: number
  y: number
}

export const DraggableCorner: FC<DraggableCorner> = ({ id, style }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    attributes: {
      roleDescription: 'grid resize handler',
    },
  })
  const transformStyle = { transform: CSS.Translate.toString(transform) }

  return (
    <div
      style={{ ...transformStyle, ...style }}
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
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const resizeHandler = (e: DragEndEvent): void => {
    const { active, delta } = e
    const { id } = active
    if (id !== 'grid-pointer') {
      const { x, y } = delta
      const [factorX, factorY] = resizeFactors[id] || [1, 1]
      setWidth(width + 2 * x * factorX)
      setHeight(height + 2 * y * factorY)
    }
  }

  return (
    <div className="flex">
      <DndContext
        onDragEnd={resizeHandler}
        onDragMove={(e) => {
          const { id: _id } = e?.over ?? {}
          const id = Number(_id)
          if (id && !checkedIds.find((i) => i === id)) {
            setCheckedIds((checked) => [...checked, Number(id)])
          }
        }}
        modifiers={[snapCenterToCursor]}
        collisionDetection={closestCenter}
        autoScroll={false}
      >
        <div className="relative mx-auto transition-spacing">
          <DraggableCorner id="tr" style={{ right: '-3em' }} />
          <DraggableCorner id="tl" style={{ left: '-3em' }} />
          <Grid
            characters={Array.from(Array(200)).map((_, i) => String(i % 10))}
            width={width}
            height={800}
            checkedIds={checkedIds}
          />
        </div>
      </DndContext>
    </div>
  )
}
