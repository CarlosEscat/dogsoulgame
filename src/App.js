import React from 'react';
import './App.css';

import DogsListContainer from './components/DogListContainer'
import DogDetailsContainer from './components/DogDetailsContainer'
import SecondGameContainer from './components/SecondGameContainer'

import { Route } from 'react-router-dom';
import GameContainer from './components/GameContainer';

export default function App() {
  return (
    <div className="App">
      <h1>Dog Soul Game</h1>
      <h2>Dogs List</h2>
      <main>
        <Route exact path="/" component={DogsListContainer} />
        <Route exact path="/gameone" component={GameContainer} />
        <Route exact path="/gametwo" component={SecondGameContainer} />
        <Route path="/dog-breeds/:breed" component={DogDetailsContainer} />
      </main>
    </div>
  );
}
