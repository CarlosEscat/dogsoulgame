import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import SuccessRate from './SuccessRate';

class SecondGameContainer extends Component {

  state = { name: '', correctName: '', AdditionalUrl: '', AdditionalUrl2: '' };

  handleSubmit = event => {
    event.preventDefault();

    this.renderRightImage();
    this.renderRandomImage()
    this.renderRandomImage2()
  };

  componentDidMount() {
    this.renderRightImage();
    this.renderRandomImage()
    this.renderRandomImage2()
  }

  renderRandomImage = () =>
    request
      .get(`https://dog.ceo/api/breeds/image/random`)
      .then(res =>
        this.setState({
          AdditionalUrl: res.body.message
        })
      )
      .catch(console.error)

  renderRandomImage2 = () =>
    request
      .get(`https://dog.ceo/api/breeds/image/random`)
      .then(res =>
        this.setState({
          AdditionalUrl2: res.body.message
        })
      )
      .catch(console.error)

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

  imageClicked(name){
    console.log(name.split('/')[4])
  }

  render() {
    return (
      <div>
        {/* <SuccessRate
          success={this.successToPercentage(this.props.userAnswers)}
        /> */}

        <NavLink to="/">
          <button className='navigation-button'>Back</button>
        </NavLink>

        <h2>Choose the photo of the {this.state.correctName}</h2>

        {this.state.name === '' ? (
          <p>loading</p>
        ) : (
            <img alt="dog" className="dog-game-image" src={this.state.name} onClick={this.imageClicked(this.state.name)}/>
          )}
        <img alt="dog" className="dog-game-image" src={this.state.AdditionalUrl} onClick={this.imageClicked(this.state.AdditionalUrl)}/>
        <img alt="dog" className="dog-game-image" src={this.state.AdditionalUrl2} onClick={this.imageClicked(this.state.AdditionalUrl2)}/>
        <br />
        <button className='navigation-button' onClick={this.handleSubmit}>Next</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers

});

export default connect(mapStateToProps)(SecondGameContainer);