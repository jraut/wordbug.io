import { createSlice } from '@reduxjs/toolkit'

interface GridState {
  checkedIds: Set<string>
  successfulWords: []
}

type SquareId = string
type Word = SquareId[] // a list of the IDs for the characters in a word
type SuccesfulWords = Word[] // Same word is ok, same coordinates not

const initialState: GridState = {
  checkedIds: new Set(),
  successfulWords: [],
}

export const gameSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {},
})

export const gameReducer = gameSlice.reducer
