import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dialogLines } from 'src/components/CharacterDialog'
import { DialogItem, DialogType } from 'src/fixtures/dialog'
import { RootState } from 'src/store'
import { CharacterName } from '../select-character/types'

interface GameState {
  character?: CharacterName
  dialogQueue: DialogItem[]
  textSpeed: number
  checkedWords: string[]
  level: number | undefined
}

export const textSpeed = {
  slow: 35,
  normal: 20,
  quick: 10,
}

const introLines = ['Welcome!']

export const defaultCharacter: CharacterName = 'Rugo'
const initialDialogItems: DialogItem[] = introLines.map((line) => ({
  line,
  type: DialogType.Random,
}))

const initialState: GameState = {
  character: defaultCharacter,
  checkedWords: [],
  dialogQueue: initialDialogItems,
  textSpeed: textSpeed.normal,
  level: undefined,
}
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameCharacter: (state, action: PayloadAction<CharacterName>) => {
      state.character = action.payload
    },
    addDialogueItem: (state, action: PayloadAction<DialogItem>) => {
      state.dialogQueue.push(action.payload)
    },
    setTextSpeed: (state, action: PayloadAction<number>) => {
      state.textSpeed = action.payload
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload
    },
    shiftDialogueItem: (state) => {
      state.dialogQueue.shift()
    },
    checkWord: (state, action: PayloadAction<string>) => {
      if (state.checkedWords.includes(action.payload) === false) {
        state.checkedWords.push(action.payload)
        state.dialogQueue.push({
          type: DialogType.Word,
          line: `"${action.payload}"? Let's see...`,
        })
        state.dialogQueue.push({
          type: DialogType.Word,
          line: dialogLines[DialogType.Word]('Aerith'),
        })
      }
    },
  },
})

export const {
  setGameCharacter,
  addDialogueItem,
  shiftDialogueItem,
  setLevel,
  checkWord,
} = gameSlice.actions

export const selectCharacter = (state: RootState): CharacterName =>
  state.game.character || 'Rugo'

export const selectFirstDialogueItem = (
  state: RootState,
): DialogItem | undefined => {
  return state.game.dialogQueue[0]
}
export const gameReducer = gameSlice.reducer
