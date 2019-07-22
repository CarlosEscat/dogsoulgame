
import React from 'react';
import './App.css';
import DogsListContainer from './components/DogListContainer'

export default function App() {
  return (
    <div className="App">
          <h1>Dog Soul Game</h1>
         <button>Start Game</button>
      <DogsListContainer />
    </div>
  );
}
