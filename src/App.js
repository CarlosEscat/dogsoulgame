
import React from 'react';
import './App.css';
import DogsListContainer from './components/DogListContainer'
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
          <h1>Dog Soul Game</h1>
         <button>Start Game</button>
      <DogsListContainer />
    </div>
    </Provider>
  );
}
