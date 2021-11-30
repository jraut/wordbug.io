import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  useDraggable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties, FC, useEffect, useState } from 'react'
import { addDialogueItem, checkWord } from 'src/features/game/store'
import { Grid } from 'src/features/grid/Grid'
import { snapCenterToCursor } from 'src/features/grid/Pointer'
import {
  addCheckedId,
  clearCheckedIds,
  Dimensions,
  setCheckedIds,
  setDimensions,
} from 'src/features/grid/store'
import { CHARACTER_DATA } from 'src/fixtures/characters'
import { DialogType } from 'src/fixtures/dialog'
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
      <div className="p-4 border-4 border-dashed rounded-full bg-highlight"></div>
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
  const [width, setWidth] = useState(window.innerWidth * 0.75)
  const [height, setHeight] = useState(window.innerHeight * 0.75)
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
  const checkedWords = useAppSelector((state) => state.game.checkedWords)
  const characterName = useAppSelector((state) => state.game.character)
  const character = characterName ? CHARACTER_DATA[characterName] : undefined
  const characters = useAppSelector((store) => store.grid.characters)

  const word = checkedIds
    .map((characterId) => characters[characterId])
    .join('')
    .replace(/\*/g, '.')
  const re = new RegExp(`^${word}$`, 'ig')
  const wordMatch = words1.find((dictionaryWord) => re.test(dictionaryWord))

  const handleCheckWord = (word: string): void => {
    dispatch(checkWord(word))
  }
  useEffect(() => {
    const newLastId = checkedIds?.[checkedIds.length - 1]
    if (newLastId && newLastId !== lastId) {
      setLastId(newLastId)
    }
    if (checkedIds.length === 0) {
      setLastId(undefined)
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
    }
  }
  return (
    <>
      <div className="absolute top-0 left-0 justify-center w-screen h-screen overflow-hidden overscroll-none direction-column">
        <div className="absolute -right-1">
          {checkedWords.map((word) => (
            <p key={word} className="p-4">
              {word}
            </p>
          ))}
        </div>
        <div className="relative top-0 left-0 z-50 w-7/12 max-w-4xl m-auto md:absolute md:w-54 md:max-w-4xl">
          <CharacterDialog character={character} />
          <button
            className="absolute p-10 text-gray-900 pointer-events-auto -right-0 -bottom-0"
            onClick={() => {
              if (wordMatch) {
                handleCheckWord(wordMatch)
              } else {
                dispatch(
                  addDialogueItem({
                    type: DialogType.NotAWord,
                    line: `"${word}"? That is not a word!`,
                  }),
                )
              }
              dispatch(setCheckedIds([]))
            }}
          >
            <div
              className="absolute w-full h-full border-8 border-dashed rounded-full bg-checkWord"
              style={{
                background:
                  'radial-gradient(#fff, rgb(134, 200, 180), rgb(134, 200, 180))',
              }}
            ></div>
            {wordMatch && (
              <div className="absolute w-full h-full border-4 border-dashed rounded-full opacity-40 bg-checkWord animate-ping"></div>
            )}
            <div className="absolute flex w-full h-full">
              <span className="m-auto">CHECK</span>
            </div>
          </button>
          <button
            className="absolute p-10 text-gray-900 pointer-events-auto right-24 -bottom-0"
            onClick={() => dispatch(clearCheckedIds())}
          >
            <div className="absolute w-full h-full bg-gray-300 border-8 border-dashed rounded-full"></div>
            <div className="absolute flex w-full h-full">
              <span className="m-auto">EMPTY</span>
            </div>
          </button>
        </div>
        <div
          className="flex w-screen m-auto duration-200 overscroll-none transition-spacing"
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
            <div className="relative flex mx-auto transition-spacing-area">
              <DraggableCorner id="tr" style={{ right: '-5em' }} />
              <DraggableCorner id="tl" style={{ left: '-5em' }} />
              <DraggableCorner id="bl" style={{ left: '-5em', bottom: 0 }} />
              <DraggableCorner id="br" style={{ right: '-5em', bottom: 0 }} />
              <DrawLine
                checkedIds={checkedIds}
                width={width}
                height={height}
                blockSize={blockSize}
              />
              <Grid
                width={width}
                height={height}
                checkedIds={checkedIds}
                blockSize={blockSize}
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
