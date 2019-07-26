import React from 'react';
import { connect } from 'react-redux';

import { addUserAnswer } from '../actions/userAnswers';
import AnswerButton from './AnswerButton';
import { breedsAlreadySeen } from '../actions/BreedOrder';

import './DisplayAnswers.css';

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();
    const hint = document.getElementById("hint");
    hint.textContent = "";

    if (this.props.answer != null) {
      this.props.breedsAlreadySeen(this.props.answer);
    }

    const {
      addUserAnswer,
      renderRandomImage,
      incorrectState,
      answer,
      handleSubmit
    } = this.props;

    if (answer === event.target.value) {
      addUserAnswer(true);
      renderRandomImage();
      if (handleSubmit !== undefined) handleSubmit();
    } else {
      addUserAnswer(false);
      incorrectState();
      setTimeout(() => {
        renderRandomImage();
        incorrectState();
        if (handleSubmit !== undefined) handleSubmit();
      }, 2000);
    }
  };

  showHint = () => {
    const correctAnswer = this.props.answer;
    const hint = document.getElementById('hint');
    hint.textContent =
      'The correct breed has the letter: ' + correctAnswer.charAt(2) + '';
  };

  answersArray = () => {
    if (Array.isArray(this.props.gameOptions))
      return this.props.gameOptions.sort(() => Math.random() - 0.5).slice(0, 3);
    else return ['But wait there is more!!!'];
  };

  render() {
    const { answer, breedsLearned } = this.props;
    const isVisible = !breedsLearned.includes(answer);

    return (
      <div>
        <p id="hint"> </p>
        <br />
        {isVisible ? (
          <button
            id="hintButton"
            className="hint-button"
            onClick={this.showHint}
          >
            Hint
          </button>
        ) : (
          <div />
        )}

        {this.answersArray().map((answer, i) => (
          <AnswerButton
            id={`${i}`}
            key={i}
            handleClick={this.handleClick}
            randomAnswers={answer}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  gameOptions: state.game.option,
  breedsLearned: state.breedsAlreadySeen
});

export default connect(
  mapStateToProps,
  { addUserAnswer, breedsAlreadySeen }
)(DisplayAnswers);
