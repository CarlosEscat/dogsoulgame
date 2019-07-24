import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import SuccessRate from './SuccessRate';
import './GameContainer.css';

class SecondGameContainer extends Component {


  state = { name: '', correctName: '' };

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
    const urls = [this.state.name, this.props.imagesObjects[this.randomIndex(this.props.imagesObjects.length)].photos[this.randomIndex(5)],
    this.props.imagesObjects[this.randomIndex(this.props.imagesObjects.length)].photos[this.randomIndex(5)]].sort()

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
            <div>
              <img alt="dog" className="dog-game-image" src={urls[0]} />
              <img alt="dog" className="dog-game-image" src={urls[1]} />
              <img alt="dog" className="dog-game-image" src={urls[2]} />
            </div>
          )}

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
