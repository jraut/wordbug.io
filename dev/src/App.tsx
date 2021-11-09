import React from 'react'
import './App.css'
import { Characters } from './components/Characters'
import { GAME_DESCRIPTION, HISTORY, WORLD_DESCRIPTION } from './fixtures/game'
import { Description } from './components/Description'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-xl p-10">Wordbug</h1>
      <Description header="The game of Wordbug" content={GAME_DESCRIPTION} />
      <Description header="The world of Gubdrow" content={WORLD_DESCRIPTION} />
      <Description header="History" content={HISTORY} />
      <Characters />
    </div>
  )
}

export default App
