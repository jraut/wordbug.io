import React from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { GAME_DESCRIPTION, HISTORY, WORLD_DESCRIPTION } from './fixtures/game';
import { Description } from './components/Description';
import colors from './fixtures/wordbug-hahmojen-varit.png'
import { CHARACTER_COLORS } from './fixtures/characters';

const App: React.FC = () => {
  return (
    <div className="App">
      <Description header="The game of Wordbug" content={
        GAME_DESCRIPTION} />
      <Description header="The world of Gubdrow" content={
        WORLD_DESCRIPTION} />
      <Description header="History" content={
        HISTORY} />
      <Characters />
      <img src={colors} alt="Color palette" style={{maxWidth: '100vw' }} />
      <div style={{fontFamily: 'monospace'}}>{JSON.stringify(CHARACTER_COLORS, undefined, 2)}</div>
    </div>
  );
}

export default App;
