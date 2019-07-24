import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBreedState } from '../actions';
import request from 'superagent';
import './DogCard.css';

class DogCard extends Component {
  state = { url: null };

  componentDidMount() {
    request
      .get(
        `https://dog.ceo/api/breed/${encodeURIComponent(
          this.props.breed
        )}/images/random`
      )
      .then(response => {
        this.setState({ url: response.body.message });
      })
      .catch(console.error);
  }

  render() {
    const { breed } = this.props;
    return (
      <div>
        {this.state.url ? (
          <img
            className="listImages"
            src={this.state.url}
            alt="Dog"
            key={`${breed}1`}
          />
        ) : (
          'Woof Woof'
        )}
        <li key={breed}>{<Link to={`/dog-breeds/${breed}`}>{breed}</Link>}</li>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds
});

export default connect(
  mapStateToProps,
  { setBreedState }
)(DogCard);
