import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import SuccessRate from './SuccessRate';
import randomIndex from './randomIndex'

import { addUserAnswer } from '../actions/userAnswers';

import './GameContainer.css';

class SecondGameContainer extends Component {
  state = { name: '', correctName: '' };

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
        this.setState({
          name: res.body.message,
          correctName: res.body.message.split('/')[4]
        })
      )
      .catch(console.error);


  successToPercentage = answers => {
    const successRate =
      (answers.filter(answer => answer === true).length / answers.length) * 100;

    return answers.length < 1 ? 0 : successRate.toFixed(0);
  };

  checkForCorrect = event => {
    event.preventDefault();

    if (event.target.id === this.state.correctName) {
      this.props.addUserAnswer(true);
    } else {
      this.props.addUserAnswer(false);
    }
  };


  render() {
    const urls = [this.state.name, this.props.imagesObjects[randomIndex(this.props.imagesObjects.length)].photos[randomIndex(5)],
    this.props.imagesObjects[randomIndex(this.props.imagesObjects.length)].photos[randomIndex(5)]].sort()

    return (
      <div>
        <SuccessRate
          success={this.successToPercentage(this.props.userAnswers)}
        />
        <NavLink to="/">
          <button className="navigation-button">Back</button>
        </NavLink>
        <h2>Choose the photo of the {this.state.correctName}</h2>
        {this.state.name === '' ? (
          <p>loading</p>
        ) : (

            <div>
              <button id={this.state.name} style={{ background: 'none', border: 'none' }} onClick={this.props.handleSubmit ? this.props.handleSubmit : this.handleSubmit}>
                <img alt="dog" className="dog-game-image" src={urls[0]} />
              </button>


              <button id="error1" style={{ background: 'none', border: 'none' }} onClick={this.props.handleSubmit ? this.props.handleSubmit : this.handleSubmit}>
                <img alt="dog" className="dog-game-image" src={urls[1]} />
              </button>

              <button id="error2" style={{ background: 'none', border: 'none' }} onClick={this.props.handleSubmit ? this.props.handleSubmit : this.handleSubmit}>
                <img alt="dog" className="dog-game-image" src={urls[2]} />
              </button>
            </div>
          )}


        <br />
        <button className="navigation-button" onClick={this.handleSubmit}>
          Next
        </button>

        <button id={'kamaal'} onClick={this.checkForCorrect}>
          TEST
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  imagesObjects: state.imagesObjects
});

export default connect(
  mapStateToProps,
  { addUserAnswer }
)(SecondGameContainer);
