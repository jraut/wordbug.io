import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from 'src/features/game/store'
import { gridReducer } from './features/grid/store'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    grid: gridReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
