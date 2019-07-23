import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent';
import DisplayAnswers from './DisplayAnswers';
import SuccessRate from './SuccessRate';

class GameContainer extends Component {
  state = { answer: '', correctAnswer: '' };

  componentDidMount() {
    this.renderRandomImage();
  }

  renderRandomImage = () =>
    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res =>
        this.setState({
          answer: res.body.message,
          correctAnswer: res.body.message.split('/')[4]
        })
      )
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

  render() {
    return (
      <div>
        <SuccessRate
          success={this.successToPercentage(this.props.userAnswers)}
        />

        <NavLink to="/">
          <button>Back</button>
        </NavLink>

        <br />
        {this.state.answer === '' ? (
          <p>loading</p>
        ) : (
          <img alt="dog" src={this.state.answer} />
        )}
        <br />
        <button onClick={this.handleSubmit}>Next</button>

        <DisplayAnswers answer={this.state.correctAnswer} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers
});

export default connect(mapStateToProps)(GameContainer);
