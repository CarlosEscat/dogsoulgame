import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent';

import DisplayAnswers from './DisplayAnswers';
import SuccessRate from './SuccessRate';
import { gameOneUrl } from '../actions';

import './GameContainer.css';

class GameContainer extends Component {
  state = { url: '', correctAnswer: '', answerIncorrectly: false };

  componentDidMount() {
    this.renderRandomImage();
  }

  renderRandomImage = () =>
    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res => {
        // this.props.gameOneUrl(res.body.message);
        return this.setState({
          url: res.body.message,
          correctAnswer: res.body.message.split('/')[4]
        });
      })
      .catch(console.error);

  handleSubmit = event => {
    event.preventDefault();

    this.renderRandomImage();
  };

  successToPercentage = answers => {
    const successRate =
      (answers.filter(answer => answer === true).length / answers.length) * 100;

    return answers.length < 1 ? 0 : successRate.toFixed(0);
  };

  showCorrectAnswer = () => {
    const buttons = document.getElementsByTagName('button');

    if (this.state.answerIncorrectly === true) {
      buttons[0].style.pointerEvents = 'none';
      buttons[1].style.pointerEvents = 'none';
      // buttons[2].style.pointerEvents = 'none';
      // buttons[3].style.pointerEvents = 'none';
      // buttons[4].style.pointerEvents = 'none';

      return <h1>{this.state.correctAnswer}</h1>;
    } else if (buttons.length > 2) {
      buttons[0].style.pointerEvents = 'auto';
      buttons[1].style.pointerEvents = 'auto';
      // buttons[2].style.pointerEvents = 'auto';
      // buttons[3].style.pointerEvents = 'auto';
      // buttons[4].style.pointerEvents = 'auto';
    }
  };

  answeredIncorrectly = () =>
    this.setState({
      answerIncorrectly: !this.state.answerIncorrectly
    });

  render() {
    return (
      <div>
        <SuccessRate
          success={this.successToPercentage(this.props.userAnswers)}
        />

        <NavLink to="/">
          <button className="navigation-button">Back</button>
        </NavLink>

        {this.showCorrectAnswer()}

        <br />
        {this.state.url === '' ? (
          <p>loading</p>
        ) : (
          <img alt="dog" className="dog-game-image" src={this.state.url} />
        )}
        <br />
        <button className="navigation-button" onClick={this.handleSubmit}>
          Next
        </button>

        <DisplayAnswers
          answer={this.state.correctAnswer}
          renderRandomImage={this.renderRandomImage}
          incorrectState={this.answeredIncorrectly}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers
});

export default connect(
  mapStateToProps,
  { gameOneUrl }
)(GameContainer);
