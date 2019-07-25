import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { setBreedState } from '../actions';
import { setDifficulty } from '../actions/setDifficulty'

import './GameContainer.css'

class DogsListContainer extends Component {
  componentDidMount() {
    this.props.setBreedState()
    this.props.setDifficulty(1)
  }

  render() {
    return (
      <div>
        <NavLink to="/gameone">
          <button className='navigation-button'>Start First Game</button>
        </NavLink>
        <NavLink to="/gametwo">
          <button className='navigation-button'>Start Second Game</button>
        </NavLink>
        <NavLink to="/gamemix">
          <button className='navigation-button'>Start Game Mix</button>
        </NavLink>
        <NavLink to="/doglist" dogBreeds={this.props.breeds}>
          <button className='navigation-button'>Learn dog breeds</button>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds
});

export default connect(
  mapStateToProps,
  { setDifficulty, setBreedState }
)(DogsListContainer);
