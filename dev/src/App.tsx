import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Characters } from './components/Characters';
import { GAME_DESCRIPTION, HISTORY, WORLD_DESCRIPTION } from './fixtures/game';
import { Description } from './components/Description';

function App() {
  return (
    <div className="App">
      <Description header="The game of Wordbug" content={
        GAME_DESCRIPTION} />
      <Description header="The world of Gubdrow" content={
        WORLD_DESCRIPTION} />
      <Description header="History" content={
        HISTORY} />
      <Characters />
    </div>
  );
}

export default App;
