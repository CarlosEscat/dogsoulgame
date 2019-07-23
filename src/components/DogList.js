import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBreedState } from '../actions';

class DogsList extends Component {
  renderDogBreed(breed) {
    return (
      <li key={breed}>{<Link to={`/dog-breeds/${breed}`}>{breed}</Link>}</li>
    );
  }
  render() {
    const breeds = this.props.breeds

    return (
      <div className="dogs-list">

        <h1>Dogs List</h1>

        {!Array.isArray(breeds) ? 'Loading...':
        <ul>
          {breeds.map(this.renderDogBreed)}
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
