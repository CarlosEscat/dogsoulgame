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

    const randomAnswersArray = answer => {
      let arr = [];

      const randomBreedName = breeds[randomIndex(breeds.length)];

      switch (difficulty) {
        case 2:
          for (let i = 0; i < 5; i++) {
            randomBreedName === undefined
              ? arr.push('Go back and start the game again please!!!')
              : arr.push(randomBreedName);
          }

          return answer.concat(arr);

        default:
          // default case is 1
          for (let i = 0; i < 2; i++) {
            randomBreedName === undefined
              ? arr.push('Go back and start the game again please!!!')
              : arr.push(randomBreedName);
          }

          return answer.concat(arr);
      }
    };

    const randomAnswers = randomAnswersArray([answer]).sort();

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
    difficulty: state.difficulty
  };
};

export default connect(
  mapStateToProps,
  { addUserAnswer }
)(DisplayAnswers);
