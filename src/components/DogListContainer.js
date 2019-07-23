import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import DogsList from './DogList';

import { setBreedState } from '../actions';

class DogsListContainer extends Component {
  componentDidMount() {
    request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        this.props.setBreedState(Object.keys(response.body.message));
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <NavLink to="/gameone">
          <button>Start Game</button>
        </NavLink>
        <DogsList dogBreeds={this.props.breeds} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    breeds: state.breeds
  };
};

export default connect(
  mapStateToProps,
  { setBreedState }
)(DogsListContainer);
