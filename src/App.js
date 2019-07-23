import React from 'react';
import './App.css';
import DogsListContainer from './components/DogListContainer';

import { Route } from 'react-router-dom';
import GameContainer from './components/GameContainer';

export default function App() {
  return (
    <div className="App">
      <h1>Dog Soul Game</h1>

      <main>
        <Route exact path="/" component={DogsListContainer} />
        <Route exact path="/gameone" component={GameContainer} />
      </main>
    </div>
  );
}
