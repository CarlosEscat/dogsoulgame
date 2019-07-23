import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent';

class GameContainer extends Component {
  state = { answer: '', correctAnswer: '' };

  randomIndex = dataLength => {
    if (dataLength < 1 || dataLength === undefined) return -1;

    return Math.floor(Math.random() * dataLength);
  };

  componentDidMount() {
    this.renderRandomImage();
  }

  renderRandomImage = () => {
    const url = 'https://dog.ceo/api/breeds/image/random';

    return request
      .get(url)
      .then(res =>
        this.setState({
          answer: res.body.message,
          correctAnswer: res.body.message.split('/')[4]
        })
      )
      .catch(console.error);
  };

  render() {
    return (
      <div>
        <NavLink to="/">
          <button>Back</button>
        </NavLink>
        <br />
        {this.state.answer === '' ? (
          <p>loading</p>
        ) : (
          <img alt="random dog" src={this.state.answer} />
        )}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   breeds: state.breeds
// });

export default connect()(GameContainer);
