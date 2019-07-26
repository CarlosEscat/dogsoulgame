import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import SuccessRate from './SuccessRate';
import randomIndex from './randomIndex';
import { gameUrl } from '../actions/index';

import { addUserAnswer } from '../actions/userAnswers';
import { addDifficulty } from '../actions/addDifficulty';
import { addImagesObjects } from '../actions/addImagesObjects';

import './GameContainer.css';

class SecondGameContainer extends Component {
  state = { answerIncorrectly: false };

  handleSubmit = event => {
    event.preventDefault();

    this.renderRightImage();
  };

  componentDidMount() {
    this.renderRightImage();
    console.log('this.props.breeds', this.props.breeds);
    this.props.breeds.map(breed => this.props.addImagesObjects(breed));
  }

  renderRightImage = () => {
    const condition = this.props.userAnswers
      .slice(this.props.userAnswers.length - 5, this.props.userAnswers.length)
      .every(value => value === true);
    if (
      this.props.userAnswers.length >= 5 * this.props.difficulty &&
      condition === true
    ) {
      this.props.addDifficulty(1);
    }

    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res =>
        this.props.gameUrl({
          url: res.body.message,
          correctAnswer: res.body.message.split('/')[4]
        })
      )
      .catch(console.error);
  };

  incorrectState = () =>
    this.setState({ answerIncorrectly: !this.state.answerIncorrectly });

  checkForCorrect = event => {
    event.preventDefault();

    const { props, renderRightImage, incorrectState } = this,
      { game, addUserAnswer, handleSubmit } = props;

    if (event.target.id === game.url) {
      addUserAnswer(true);
      renderRightImage();
      if (handleSubmit !== undefined) handleSubmit();
    } else {
      addUserAnswer(false);
      incorrectState();
      setTimeout(() => {
        this.renderRightImage();
        incorrectState();
        if (handleSubmit !== undefined) handleSubmit();
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
      <span>
        <h2>Choose the photo of the {this.props.game.correctAnswer}</h2>
        {this.state.name === '' ? (
          <p>loading</p>
        ) : (
          <button
            style={{ background: 'none', border: 'none' }}
            onClick={this.checkForCorrect}
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
          <span>
            <button
              style={{ background: 'none', border: 'none' }}
              onClick={this.checkForCorrect}
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
              onClick={this.checkForCorrect}
            >
              <img
                id={urls[2]}
                alt="dog"
                className="dog-game-image"
                src={urls[2]}
              />
            </button>
          </span>
        )}

        <br />
        <button className="navigation-button" onClick={this.handleSubmit}>
          Next
        </button>
      </span>
    );
  };

  showCorrectAnswer = () => {
    if (this.state.answerIncorrectly === true) {
      return (
        <img alt="dog" className="dog-game-image" src={this.props.game.url} />
      );
    }
  };

  render() {
    return (
      <div>
        <SuccessRate success={this.props.userAnswers} />

        <NavLink to="/">
          <button className="navigation-button">Back</button>
        </NavLink>

        {this.showCorrectAnswer()}

        {this.state.answerIncorrectly === true ? <div /> : this.renderGame()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds,
  userAnswers: state.userAnswers,
  imagesObjects: state.imagesObjects,
  game: state.game,
  difficulty: state.difficulty
});

export default connect(
  mapStateToProps,
  { addUserAnswer, gameUrl, addDifficulty, addImagesObjects }
)(SecondGameContainer);
