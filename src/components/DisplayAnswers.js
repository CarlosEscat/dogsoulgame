import React from 'react';
import { connect } from 'react-redux';

import { addUserAnswer } from '../actions/userAnswers';
import randomIndex from './randomIndex';
import AnswerButton from './AnswerButton';

import './DisplayAnswers.css';
import { breedsAlreadySeen } from '../actions/BreedOrder'

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();
    const button1 = document.getElementById("button1")
    const button2 = document.getElementById("button2")
    button1.style.visibility = 'visible'
    button2.style.visibility = 'visible'
    
    if(this.props.answer != null){
      this.props.breedsAlreadySeen(this.props.answer)
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
    this.showButtonHint()
  };

  showButtonHint = () => {
    console.log(this.props.answer)
    document.getElementById("hintButton").style.visibility = 'vissible'
    if(this.props.breedsLearned.length !==0 && this.props.breedsLearned.includes(this.props.answer)===false){
      document.getElementById("hintButton").style.visibility = 'vissible'
    }else if(this.props.breedsLearned.includes(this.props.answer)===true){
      console.log('Entered if', this.props.breedsLearned + ' ' + this.props.answer)
      document.getElementById("hintButton").style.visibility = 'hidden'
    }
  }

  showHint = () => {
    const correctAnswer = this.props.answer
    const button1 = document.getElementById("1")
    const button2 = document.getElementById("2")
    
    if (button1.value !== correctAnswer){
      button1.style.visibility = 'hidden'
    }else if(button2.value !== correctAnswer){
      button2.style.visibility = 'hidden'
    } 
  }

  render() {
    const { answer, breeds, difficulty } = this.props;

    const randomAnswersArray = answer => {
      let arr = [];

      switch (difficulty) {
        case 2:
          for (let i = 0; i < 5; i++) {
            breeds[randomIndex(breeds.length)] === undefined
              ? arr.push('Go back and start the game again please!!!')
              : arr.push(breeds[randomIndex(breeds.length)]);
          }

          return answer.concat(arr);

        default:
          // default case is 1
          for (let i = 0; i < 2; i++) {
            breeds[randomIndex(breeds.length)] === undefined
              ? arr.push('Go back and start the game again please!!!')
              : arr.push(breeds[randomIndex(breeds.length)]);
          }

          return answer.concat(arr);
      }
    };

    const randomAnswers = randomAnswersArray([answer]).sort();

    
    
    return (
      <div>

        <button id="hintButton" className="hint-button" onClick={this.showHint} >Hint</button>

        {randomAnswers.map((answer, i) => (
          <AnswerButton
            id={i}
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

    breedsLearned: state.breedsAlreadySeen

    difficulty: state.difficulty

  };
};

export default connect(
  mapStateToProps,
  { addUserAnswer, breedsAlreadySeen }
)(DisplayAnswers);
