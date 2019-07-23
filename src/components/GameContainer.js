import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent';

class GameContainer extends Component {
  randomIndex = dataLength => {
    if (dataLength < 1 || dataLength === undefined) return console.log(-1);

    return Math.floor(Math.random() * dataLength);
  };

  componentDidMount() {
    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res => console.log(res.body.message.split('/')[4]))
      .catch(console.error);
  }

  renderRandomImage = randomNumber => {
    const url = 'https://dog.ceo/api/breeds/image/random';
    console.log(url.split('/'));
  };

  render() {
    console.log(this.props.breeds);
    this.renderRandomImage(this.props.breeds.length);

    return (
      <div>
        <NavLink to="/">
          <button>Back</button>
        </NavLink>
        <br /> Hallo
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds
});

export default connect(mapStateToProps)(GameContainer);
