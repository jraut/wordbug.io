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
import {
  addCheckedId,
  clearCheckedIds,
  Dimensions,
  setDimensions,
} from 'src/features/grid/store'
import { words1 } from 'src/fixtures/words'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'
import { CharacterDialog } from './CharacterDialog'
import { DrawLine } from './DrawLine'
export type CornerModifier = 1 | -1 | 0
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DraggableCorner {
  id: string
  style?: CSSProperties
}

export const indexToCoordinate = (
  index: number,
  dimensions: Dimensions,
  frustrated = false,
): Dimensions => {
  const [nx] = dimensions
  return [index % nx, !frustrated ? Math.floor(index / nx) : index / nx] // make line go wonky if frustrated
}

export const coordinateToIndex = (
  coordinate: Dimensions,
  dimensions: Dimensions,
): number => {
  const [x, y] = coordinate
  const [nx] = dimensions
  const fromY = y * nx
  return fromY + x
}

// TODO: add functionality
const isAdjacentSquare = (
  needle: number,
  previous: number | undefined,
  dimensions: Dimensions,
): boolean => {
  if (!previous && previous !== 0) {
    return true
  } else {
    const factors = [-1, 0, 1]
    const coordinates = indexToCoordinate(previous, dimensions)
    const [newX, newY] = indexToCoordinate(needle, dimensions)
    const [x, y] = coordinates
    const neighbourgs = factors.reduce<number[][]>((memo, modifier) => {
      return [
        ...memo,
        ...factors
          .map((modifier2) => [x + modifier2, y])
          .map(([newX, newY]) => [newX, newY + modifier]),
      ]
    }, [])
    const found = neighbourgs.find(
      ([neighX, neighY]) => neighX === newX && neighY === newY,
    )
    return Boolean(found)
  }
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
      className="absolute z-30"
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
      let _width = width + 2 * x * factorX
      let _height = height + 2 * y * factorY
      _width = Math.max(_width, 200) // 200 or more
      _height = Math.max(_height, 200) // 200 or more
      _width = Math.min(_width, window.innerWidth * 0.95) // less than window
      _height = Math.min(_height, window.innerHeight * 0.95) // less than winwo
      setWidth(_width)
      setHeight(_height)
      dispatch(clearCheckedIds())
    }
  }
  const characters = useAppSelector((store) => store.grid.characters)

  const word = checkedIds.map((characterId) => characters[characterId]).join('')
  const re = new RegExp(`^${word.replaceAll('*', '.')}$`, 'ig')
  const wordMatch = words1.find((dictionaryWord) => re.test(dictionaryWord))

  useEffect(() => {
    const newLastId = checkedIds?.[checkedIds.length - 1]
    if (newLastId && newLastId !== lastId) {
      setLastId(newLastId)
    }
  }, [checkedIds])

  const nx = Math.ceil(Math.sqrt((characters.length * width) / height))
  let ny = Math.ceil(Math.sqrt((characters.length * height) / width))

  const dimensions: Dimensions = [nx, ny]

  if (nx * (ny - 1) > characters.length) {
    ny = ny - 1
  }

  const blockSize = Math.min(width / nx, height / ny)

  useEffect(() => {
    setDimensions([nx, ny])
  }, [nx, ny])

  const checkHandler = (e: DragMoveEvent): void => {
    const { id: _id } = e?.over ?? {}
    const { id: activeId } = e?.active
    if (activeId !== 'grid-pointer') {
      return undefined
    }
    const id = Number(_id)
    if (
      (id || id === 0) &&
      checkedIds.find((i) => i === id) === undefined &&
      isAdjacentSquare(id, lastId, dimensions) // TODO
    ) {
      dispatch(addCheckedId(id))
      // setCheckedIds((checked) => [...stateCheckedIds, Number(id)])
    } else {
      console.log({
        is: isAdjacentSquare(id, lastId, dimensions),
        id,
        checkedIds,
      })
    }
  }

  return (
    <>
      <div className="overflow-hidden overscroll-none absolute top-0 left-0 justify-center w-screen h-screen direction-column">
        <div className="absolute -right-1">
          <button
            onClick={() => {
              dispatch(clearCheckedIds())
              setLastId(undefined)
            }}
          >
            [ clear ]
          </button>
          [ {wordMatch ? `${wordMatch} is a word` : '...'} ] - word:
          <p className={`${wordMatch ? 'bg-red' : ''}`}>{word} -</p>
        </div>
        <div className="relative top-0 left-0 z-50 m-auto w-10/12 pointer-events-none md:absolute md:w-54 xl:w-2/5">
          <CharacterDialog />
        </div>
        <div
          className="flex overscroll-none m-auto w-screen duration-200 transition-spacing"
          style={{
            marginTop: `${(window.innerHeight - height) / 2}px`,
          }}
        >
          <DndContext
            onDragEnd={resizeHandler}
            onDragMove={checkHandler}
            modifiers={[snapCenterToCursor]}
            collisionDetection={closestCenter}
            autoScroll={false}
          >
            <div className="flex relative mx-auto transition-spacing transition-area">
              <DraggableCorner id="tr" style={{ right: '-5em' }} />
              <DraggableCorner id="tl" style={{ left: '-5em' }} />
              <DraggableCorner id="bl" style={{ left: '-5em', bottom: 0 }} />
              <DraggableCorner id="br" style={{ right: '-5em', bottom: 0 }} />
              <DrawLine
                checkedIds={checkedIds}
                width={width}
                height={height}
                dimensions={dimensions}
                blockSize={blockSize}
              />
              <Grid
                width={width}
                height={height}
                checkedIds={checkedIds}
                blockSize={blockSize}
                dimensions={dimensions}
              />
            </div>
          </DndContext>
          <div role="button" className="absolute -bottom-1">
            Go to menu
          </div>
        </div>
      </div>
    </>
  )
}
