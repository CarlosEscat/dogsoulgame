import React from 'react';
import './App.css';
import DogsListContainer from './components/DogListContainer'
import DogDetailsContainer from './components/DogDetailsContainer'
import SecondGameContainer from './components/SecondGameContainer'
import GameMix from './components/GameMix'

import { Route } from 'react-router-dom';
import GameContainer from './components/GameContainer';
import DogList from './components/DogList';

export default function App() {
  return (
    <div className="App">
      <h1>Dog Soul Game</h1>
      <h2>Dogs List</h2>
      <main>
        <Route exact path="/" component={DogsListContainer} />
        <Route exact path="/gameone" component={GameContainer} />
        <Route exact path="/gametwo" component={SecondGameContainer} />
        <Route exact path="/gamemix" component={GameMix} />
        <div className="breedList">
          <Route exact path="/doglist" component={DogList} />
        </div>
        <Route path="/dog-breeds/:breed" component={DogDetailsContainer} />
      </main>
    </div>
  );
}
