import React from 'react';
import { connect } from 'react-redux';
import { addUserAnswer } from '../actions/userAnswers';
import randomIndex from './randomIndex';
import './DisplayAnswers.css';

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();
    const button1 = document.getElementById("button1")
    const button2 = document.getElementById("button2")
    button1.style.visibility = 'visible'
    button2.style.visibility = 'visible'

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

  showHint = () => {
    const correctAnswer = this.props.answer
    const button1 = document.getElementById("button1")
    const button2 = document.getElementById("button2")
    
    console.log(correctAnswer)
    
    if (button1.value !== correctAnswer){
      button1.style.visibility = 'hidden'
    }else if(button2.value !== correctAnswer){
      button2.style.visibility = 'hidden'
    } 
  }

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
        <button id="button1"
          className="answer-button"
          onClick={
            this.props.handleSubmit ? this.props.handleSubmit : this.handleClick
          }
          value={randomAnswers[0]}
        >
          {randomAnswers[0]}
        </button>
        <button id="button2"
          className="answer-button"
          onClick={
            this.props.handleSubmit ? this.props.handleSubmit : this.handleClick
          }
          value={randomAnswers[1]}
        >
          {randomAnswers[1]}
        </button>
        <button id="button3"
          className="answer-button"
          onClick={
            this.props.handleSubmit ? this.props.handleSubmit : this.handleClick
          }
          value={randomAnswers[2]}
        >
          {randomAnswers[2]}
        </button>
        <br></br>
        <button className="hint-button" onClick={this.showHint}>Hint</button>
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
