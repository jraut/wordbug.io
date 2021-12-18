import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { indexToCoordinate } from 'src/components/GameArea'
import { setLevel } from 'src/features/game/store'
import { generateCharacters } from './utils'

export interface Coordinates {
  x: number
  y: number
}

export type SquareInfo = [character: string, indexX: number, indexY: number]

const characterToSquareInfo =
  (dimensions: Dimensions) =>
  (char: string, i: number): SquareInfo => {
    const [left, top] = indexToCoordinate(i, dimensions)
    return [char, left, top]
  }

export type Dimensions = [nX: number, nY: number]

interface GridState {
  checkedIds: Record<string, boolean>
  successfulWords: SuccesfulWords
  characters: string[]
  dimensions: Dimensions
  squares: SquareInfo[]
}

type SquareId = number
export type Word = SquareId[] // a list of the IDs for the characters in a word
type SuccesfulWords = Word[] // Same word is ok, same coordinates not

export const levelLength = (level: number): number => {
  return 120 + level * 40
}

export const generateLevelCharacters = (level: number): string[] => {
  return generateCharacters(`level-${level}`, levelLength(level))
}

const initialState: GridState = {
  checkedIds: {},
  successfulWords: [],
  characters: [], // createLevel(),
  squares: [],
  //  createLevel().map((char, i) =>
  //   characterToSquareInfo({ x: 800, y: 400 })(char, i),
  // ),
  dimensions: [12, 10],
}

// type CheckedCharacter = {
//   id: number
//   character: string
// }

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    addCheckedId: (state, action: PayloadAction<SquareId>) => {
      state.checkedIds[action.payload] = true
    },
    clearCheckedIds: (state) => {
      state.checkedIds = {}
    },
    setDimensions: (state, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload
      state.squares = state.characters.map(
        characterToSquareInfo(action.payload),
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLevel, (state, action) => {
      const characters = generateLevelCharacters(action.payload)
      state.characters = characters
    })
  },
})

export const gridReducer = gridSlice.reducer

export const { addCheckedId, clearCheckedIds, setDimensions } =
  gridSlice.actions
