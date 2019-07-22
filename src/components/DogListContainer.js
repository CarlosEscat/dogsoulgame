import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import DogsList from './DogList';
import DogDetailsContainer from './DogDetailsContainer'

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
        <DogsList dogBreeds={this.props.breeds} />
        <DogDetailsContainer />
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    breeds: state.reducer
  };
};

export default connect(
  mapStateToProps,
  { setBreedState }
)(DogsListContainer);
