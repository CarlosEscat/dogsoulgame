import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import SuccessRate from './SuccessRate';
import randomIndex from './randomIndex';
import { gameUrl } from '../actions/index';

import { addUserAnswer } from '../actions/userAnswers';

import './GameContainer.css';

class SecondGameContainer extends Component {
  state = {answerIncorrectly: false };

  handleSubmit = event => {
    event.preventDefault();
    this.renderRightImage();
  };

  componentDidMount() {
    this.renderRightImage();
  }

  renderRightImage = () =>
    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res =>
        this.props.gameUrl(
          {
            url: res.body.message,
            correctAnswer: res.body.message.split('/')[4]
          }
        )
      )
      .catch(console.error);

  successToPercentage = answers => {
    const successRate =
      (answers.filter(answer => answer === true).length / answers.length) * 100;

    return answers.length < 1 ? 0 : successRate.toFixed(0);
  };

  checkForCorrect = event => {
    event.preventDefault();

    if (event.target.id === this.props.game.url) {
      this.props.addUserAnswer(true);
      this.renderRightImage();
    } else {
      this.props.addUserAnswer(false);
      this.setState({ answerIncorrectly: !this.state.answerIncorrectly });

      setTimeout(() => {
        this.renderRightImage();
        this.setState({
          answerIncorrectly: !this.state.answerIncorrectly
        });
      }, 2000);
    }
  };

  renderGame = () => {
    let urls = [];

    if (this.props.imagesObjects.length !== 0) {
      urls = [
        this.props.game.url,
        this.props.imagesObjects[randomIndex(this.props.imagesObjects.length)]
          .photos[randomIndex(5)],
        this.props.imagesObjects[randomIndex(this.props.imagesObjects.length)]
          .photos[randomIndex(5)]
      ].sort();
    } else
      urls = [
        'https://www.stickerstudio.com.au/image/cache/catalog/warningsignsitempics/caution_warning_sign_sticker-650x800.jpg'
      ];

    return (
      <div>
        <h2>Choose the photo of the {this.props.game.correctAnswer}</h2>
        {this.props.game.name === '' ? (
          <p>loading</p>
        ) : (
          <button
            style={{ background: 'none', border: 'none' }}
            onClick={
              this.props.handleSubmit
                ? this.props.handleSubmit
                : this.checkForCorrect
            }
          >
            <img
              id={urls[0]}
              alt="dog"
              className="dog-game-image"
              src={urls[0]}
            />
          </button>
        )}

        {this.props.imagesObjects.length === 0 ? (
          <h1>Stop</h1>
        ) : (
          <div>
            <button
              style={{ background: 'none', border: 'none' }}
              onClick={
                this.props.handleSubmit
                  ? this.props.handleSubmit
                  : this.checkForCorrect
              }
            >
              <img
                id={urls[1]}
                alt="dog"
                className="dog-game-image"
                src={urls[1]}
              />
            </button>

            <button
              style={{ background: 'none', border: 'none' }}
              onClick={
                this.props.handleSubmit
                  ? this.props.handleSubmit
                  : this.checkForCorrect
              }
            >
              <img
                id={urls[2]}
                alt="dog"
                className="dog-game-image"
                src={urls[2]}
              />
            </button>
          </div>
        )}

        <br />
        <button className="navigation-button" onClick={this.handleSubmit}>
          Next
        </button>
      </div>
    );
  };

  showCorrectAnswer = () => {
    if (this.state.answerIncorrectly === true) {
      return <img alt="dog" className="dog-game-image" src={this.props.game.url} />;
    }
  };

  render() {
    console.log('state:', this.state.answerIncorrectly);

    return (
      <div>
        {this.showCorrectAnswer()}

        <SuccessRate
          success={this.successToPercentage(this.props.userAnswers)}
        />

        <NavLink to="/">
          <button className="navigation-button">Back</button>
        </NavLink>

        {this.state.answerIncorrectly === true ? <div /> : this.renderGame()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  imagesObjects: state.imagesObjects,
  game: state.game
});

export default connect(
  mapStateToProps,
  { addUserAnswer, gameUrl }
)(SecondGameContainer);
