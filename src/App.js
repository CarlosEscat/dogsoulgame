
import React from 'react';
import './App.css';
import DogsListContainer from './components/DogListContainer'
// import DogDetailsContainer from './components/DogDetailsContainer'
import { Route } from 'react-router-dom'


export default function App() {
  return (
    <div className="App">
      <h1>Dog Soul Game</h1>
      <button>Start Game</button>
      <main>
        <Route exact path="/" component={DogsListContainer} />
        {/* <Route path="/dog-breeds/:breed" component={DogDetailsContainer} /> */}
      </main>
    </div>
  );
}

