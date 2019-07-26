import React from "react";
import { connect } from "react-redux";

import { addUserAnswer } from "../actions/userAnswers";
import AnswerButton from "./AnswerButton";
import { breedsAlreadySeen } from "../actions/BreedOrder";

import "./DisplayAnswers.css";

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    button1.style.visibility = "visible";
    button2.style.visibility = "visible";

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
    this.showButtonHint();
  };

  showButtonHint = () => {
    console.log(this.props.answer);
    document.getElementById("hintButton").style.visibility = "vissible";
    if (
      this.props.breedsLearned.length !== 0 &&
      this.props.breedsLearned.includes(this.props.answer) === false
    ) {
      document.getElementById("hintButton").style.visibility = "vissible";
    } else if (this.props.breedsLearned.includes(this.props.answer) === true) {
      console.log(
        "Entered if",
        this.props.breedsLearned + " " + this.props.answer
      );
      document.getElementById("hintButton").style.visibility = "hidden";
    }
  };

  showHint = () => {
    const correctAnswer = this.props.answer;
    const button1 = document.getElementById("1");
    const button2 = document.getElementById("2");

    if (button1.value !== correctAnswer) {
      button1.style.visibility = "hidden";
    } else if (button2.value !== correctAnswer) {
      button2.style.visibility = "hidden";
    }
  };

  answersArray = () => {
    if (Array.isArray(this.props.gameOptions))
      return this.props.gameOptions.sort(() => Math.random() - 0.5);
    else return ["But wait there is more!!!"];
  };

  render() {
    const { answer, breedsLearned } = this.props;
    const isVisible = !breedsLearned.includes(answer);
    return (
      <div>
        {/* <button id="hintButton" className="hint-button" onClick={this.showHint}>
          Hint
        </button> */}

        <button
          id="hintButton"
          className={`hint-button ${isVisible ? "visible" : "hidden"}`}
          onClick={this.showHint}
        >
          Hint
        </button>

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
