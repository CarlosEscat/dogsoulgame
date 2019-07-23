import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBreedState } from '../actions';
import DogCard from './DogCard'

class DogsList extends Component {
  
  render() {
    const breeds = this.props.breeds

    return (
      <div className="dogs-list">

        <h1>Dogs List</h1>

        {!Array.isArray(breeds) ? 'Loading...':
        <ul>
          {breeds.map(breed => <DogCard breed={breed}/>)}
        </ul>}
       
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
)(DogsList);
