import React from 'react';
import { connect } from 'react-redux';

import { addUserAnswer } from '../actions/userAnswers';
import randomIndex from './randomIndex';
import AnswerButton from './AnswerButton';

import './DisplayAnswers.css';

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();

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

  render() {
    const { answer, breeds, difficulty } = this.props;

    const answersArray = answer => {
      return answer.concat(this.props.gameOptions);
    };

    const randomAnswers = answersArray([answer]).sort(
      () => Math.random() - 0.5
    );

    return (
      <div>
        {randomAnswers.map((answer, i) => (
          <AnswerButton
            key={i}
            handleClick={this.handleClick}
            randomAnswers={answer}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAnswers: state.userAnswers,
    breeds: state.breeds,
    difficulty: state.difficulty,
    gameOptions: state.game.option
  };
};

export default connect(
  mapStateToProps,
  { addUserAnswer }
)(DisplayAnswers);
