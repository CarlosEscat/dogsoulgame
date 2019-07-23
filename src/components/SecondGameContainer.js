import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import SuccessRate from './SuccessRate';

class SecondGameContainer extends Component {


  state = { name: '', correctName: ''};

  randomIndex = dataLength => {
    if (dataLength < 1 || dataLength === undefined) return -1;

    return Math.floor(Math.random() * dataLength);
  };


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

  render() {
    return (
      <div>
        {/* <SuccessRate
          success={this.successToPercentage(this.props.userAnswers)}
        /> */}

        <NavLink to="/">
          <button className="navigation-button">Back</button>
        </NavLink>

        <h2>Choose the photo of the {this.state.correctName}</h2>

        {this.state.name === '' ? (
          <p>loading</p>
        ) : (

            <img alt="dog" className="dog-game-image" src={this.state.name} />
          )}
        <img alt="dog" className="dog-game-image" src={this.props.imagesObjects[this.randomIndex(this.props.imagesObjects.length)].photos[this.randomIndex(5)]} />
        <img alt="dog" className="dog-game-image" src={this.props.imagesObjects[this.randomIndex(this.props.imagesObjects.length)].photos[this.randomIndex(5)]} />

        <br />
        <button className="navigation-button" onClick={this.handleSubmit}>
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({

  userAnswers: state.userAnswers,
  imagesObjects: state.imagesObjects

});

export default connect(mapStateToProps)(SecondGameContainer);
