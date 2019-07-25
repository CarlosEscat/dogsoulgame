import React from 'react';
import { connect } from 'react-redux';
import { addUserAnswer } from '../actions/userAnswers';
import randomIndex from './randomIndex';
import './DisplayAnswers.css';

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();

    const {
      addUserAnswer,
      renderRandomImage,
      incorrectState,
      answer
    } = this.props;

    if (answer === event.target.value) {
      addUserAnswer(true);
      renderRandomImage();
    } else {
      addUserAnswer(false);
      incorrectState();
      setTimeout(() => {
        renderRandomImage();
        incorrectState();
      }, 2000);
    }
  };

  render() {
    const { answer, breeds } = this.props;

    const randomName1 = breeds[randomIndex(breeds.length)];
    const randomName2 = breeds[randomIndex(breeds.length)];

    const randomAnswers = [
      answer,
      randomName1 === undefined
        ? 'Go back and start the game again please!!!'
        : randomName1,
      randomName2 === undefined
        ? 'Go back and start the game again please!!!'
        : randomName2
    ].sort();

    return (
      <div>
        <button
          className="answer-button"
          onClick={
            this.props.handleSubmit ? this.props.handleSubmit : this.handleClick
          }
          value={randomAnswers[0]}
        >
          {randomAnswers[0]}
        </button>
        <button
          className="answer-button"
          onClick={
            this.props.handleSubmit ? this.props.handleSubmit : this.handleClick
          }
          value={randomAnswers[1]}
        >
          {randomAnswers[1]}
        </button>
        <button
          className="answer-button"
          onClick={
            this.props.handleSubmit ? this.props.handleSubmit : this.handleClick
          }
          value={randomAnswers[2]}
        >
          {randomAnswers[2]}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAnswers: state.userAnswers,
    breeds: state.breeds
  };
};

export default connect(
  mapStateToProps,
  { addUserAnswer }
)(DisplayAnswers);
