import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CharacterName } from 'src/fixtures/characters'
import { DialogItem, DialogType } from 'src/fixtures/dialog'
import { RootState } from 'src/store'

interface GameState {
  character?: CharacterName
  dialogQueue: DialogItem[]
}

const introLines = [
  'Hi! Welcome!',
  'I am MC Avatar and I am here to say...',
  "I'll go to idle-mode when your attention starts to sway...",
  "And after 5 idle-lines I'll start wandering off.",
]

export const defaultCharacter: CharacterName = 'Rugo'
const initialDialogItems: DialogItem[] = introLines.map((line) => ({
  line,
  type: DialogType.Random,
}))

const initialState: GameState = {
  character: defaultCharacter,
  dialogQueue: initialDialogItems,
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
    shiftDialogueItem: (state) => {
      state.dialogQueue.shift()
    },
  },
})

export const { setGameCharacter, addDialogueItem, shiftDialogueItem } =
  gameSlice.actions

export const selectCharacter = (state: RootState): CharacterName =>
  state.game.character || 'Rugo'

export const selectFirstDialogueItem = (
  state: RootState,
): DialogItem | undefined => {
  return state.game.dialogQueue[0]
}
export const gameReducer = gameSlice.reducer
