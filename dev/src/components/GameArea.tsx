import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  useDraggable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties, FC, useEffect, useState } from 'react'
import { Grid } from 'src/features/grid/Grid'
import { snapCenterToCursor } from 'src/features/grid/Pointer'
import { addCheckedId, clearCheckedIds } from 'src/features/grid/store'
import { createLevel } from 'src/features/grid/utils'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'
import { words1 } from 'src/fixtures/words'
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

// TODO: add functionality
const isAdjacentSquare = (
  _new: number,
  previous: number | undefined,
  _rowLength: number,
): boolean => {
  if (!previous) return true
  return true
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
  tr: [1, -1],
  r: [1, 0],
  br: [1, 1],
  b: [0, -1],
  bl: [-1, 1],
  l: [-1, 0],
  tl: [-1, -1],
}

export const GameArea: FC<GameArea> = () => {
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(800)
  const checkedIds = useAppSelector((state) => state.grid.checkedIds)
  const [lastId, setLastId] = useState<number | undefined>()
  const dispatch = useAppDispatch()
  // const [checkedIds, setCheckedIds] = useState<number[]>([])
  const resizeHandler = (e: DragEndEvent): void => {
    // TODO: Limit to dimensions of parent container,
    // TODO: Add min size
    const { active, delta } = e
    const { id } = active
    if (id !== 'grid-pointer') {
      const { x, y } = delta
      const [factorX, factorY] = resizeFactors[id] || [1, 1]
      setWidth(width + 2 * x * factorX)
      setHeight(height + 2 * y * factorY)
    }
  }
  const characters = createLevel()
  const word = checkedIds.map((characterId) => characters[characterId]).join('')
  const re = new RegExp(`^${word.replaceAll('*', '.')}$`, 'ig')
  console.log(word)
  const wordMatch = words1.find((dictionaryWord) => re.test(dictionaryWord))

  useEffect(() => {
    const newLastId = checkedIds?.[checkedIds.length - 1]
    if (newLastId && newLastId !== lastId) {
      setLastId(newLastId)
    }
  }, [checkedIds])

  const checkHandler = (e: DragMoveEvent): void => {
    console.log('here')
    const { id: _id } = e?.over ?? {}
    const id = Number(_id)
    if (
      id &&
      !checkedIds.find((i) => i === id) &&
      isAdjacentSquare(id, lastId, 1) // TODO
    ) {
      dispatch(addCheckedId(Number(id)))
      // setCheckedIds((checked) => [...stateCheckedIds, Number(id)])
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => {
            dispatch(clearCheckedIds())
          }}
        >
          [ clear ]
        </button>
        [ {wordMatch ? `${wordMatch} is a word` : '...'} ] - word:
        <p className={`${wordMatch ? 'bg-red' : ''}`}>{word} -</p>
      </div>
      <div className="flex w-screen" style={{ height: '60vh' }}>
        <DndContext
          onDragEnd={resizeHandler}
          onDragMove={checkHandler}
          modifiers={[snapCenterToCursor]}
          collisionDetection={closestCenter}
          autoScroll={false}
        >
          <div className="flex relative m-auto transition-spacing">
            <DraggableCorner id="tr" style={{ right: '-3em' }} />
            <DraggableCorner id="tl" style={{ left: '-3em' }} />
            <DraggableCorner id="bl" style={{ left: '-3em', bottom: 0 }} />
            <DraggableCorner id="br" style={{ right: '-3em', bottom: 0 }} />
            <Grid
              characters={characters}
              width={width}
              height={height}
              checkedIds={checkedIds}
            />
          </div>
        </DndContext>
      </div>
    </>
  )
}
