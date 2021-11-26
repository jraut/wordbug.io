import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialogItem, DialogType } from 'src/fixtures/dialog'
import { RootState } from 'src/store'
import { CharacterName } from '../select-character/types'

interface GameState {
  character?: CharacterName
  dialogQueue: DialogItem[]
  textSpeed: number
  level: number | undefined
}

export const textSpeed = {
  slow: 35,
  normal: 20,
  quick: 10,
}

const introLines = [
  'Hi! Welcome!',
  'I am MC Avatar and I am here to say...',
  "I'll go to idle-mode when your attention starts to sway...",
  "And after 5 idle-lines I'll start to get impatient. Idle mode starting, Lets go!",
]

export const defaultCharacter: CharacterName = 'Rugo'
const initialDialogItems: DialogItem[] = introLines.map((line) => ({
  line,
  type: DialogType.Random,
}))

const initialState: GameState = {
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
  },
})

export const {
  setGameCharacter,
  addDialogueItem,
  shiftDialogueItem,
  setLevel,
} = gameSlice.actions

export const selectCharacter = (state: RootState): CharacterName =>
  state.game.character || 'Rugo'

export const selectFirstDialogueItem = (
  state: RootState,
): DialogItem | undefined => {
  return state.game.dialogQueue[0]
}
export const gameReducer = gameSlice.reducer
