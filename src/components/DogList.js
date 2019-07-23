import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DogsList extends Component {
  renderDogBreed(breed) {
    return (
      <li key={breed}>{<Link to={`/dog-breeds/${breed}`}>{breed}</Link>}</li>
    );
  }
  render() {
    // const { breeds } = this.props

    return (
      <div className="dogs-list">
        {/* {breeds === null ? 'Loading...':
        <ul>
          {breeds.map(this.renderDogBreed)}
        </ul>} */}

        <h1>Dogs List</h1>
        {/* {{dogBreeds === null ? 'Loading...':
        <ul>
          {dogBreeds.map(this.renderDogBreed)}
        </ul>} } */}

        {/* {
          dogBreeds &&
          <ul>{ dogBreeds.map(this.renderDogBreed) }</ul>
        } */}
      </div>
    );
  }
}
