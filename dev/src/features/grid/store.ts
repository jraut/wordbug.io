import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GridState {
  checkedIds: Word
  successfulWords: SuccesfulWords
}

type SquareId = number
export type Word = SquareId[] // a list of the IDs for the characters in a word
type SuccesfulWords = Word[] // Same word is ok, same coordinates not

const initialState: GridState = {
  checkedIds: [],
  successfulWords: [],
}

// type CheckedCharacter = {
//   id: number
//   character: string
// }

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setCheckedIds: (state, action: PayloadAction<SquareId[]>) => {
      if (state.checkedIds.length !== action.payload.length) {
        state.checkedIds = action.payload
      }
    },
    addCheckedId: (state, action: PayloadAction<SquareId>) => {
      state.checkedIds.push(action.payload)
    },
    clearCheckedIds: (state) => {
      state.checkedIds = []
    },
  },
})

export const gridReducer = gridSlice.reducer

export const { setCheckedIds, addCheckedId, clearCheckedIds } =
  gridSlice.actions
