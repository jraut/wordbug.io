import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Characters } from './components/Characters';
import { GAME_DESCRIPTION, HISTORY, WORLD_DESCRIPTION } from './fixtures/game';

function App() {
  return (
    <div className="App">
      <h1>The game of Wordbug</h1>
      <p>{GAME_DESCRIPTION}</p>
      <h1>The world of Gubdrow</h1>
      <p>{WORLD_DESCRIPTION}</p>
      <h1>History</h1>
      <p>{HISTORY.map(s => <p>{s}</p>)}</p>
      <Characters />
    </div>
  );
}

export default App;
