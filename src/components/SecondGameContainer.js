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
          <button id={this.state.name} style={{background:'none', border:'none'}} onClick={() => console.log(this.state.name.split('/')[4])}> 
            <img alt="dog" className="dog-game-image" src={this.state.name}/>
          </button>
          )}

        <button id="error1" style={{background:'none', border:'none'}} onClick={() => console.log('Error this is not the image breed')}> 
        <img alt="dog" className="dog-game-image" src={this.props.imagesObjects[this.randomIndex(this.props.imagesObjects.length)].photos[this.randomIndex(5)]} />
        </button>
        
        <button id="error2" style={{background:'none', border:'none'}} onClick={() => console.log('Error this is not the image breed')}> 
        <img alt="dog" className="dog-game-image" src={this.props.imagesObjects[this.randomIndex(this.props.imagesObjects.length)].photos[this.randomIndex(5)]}/>
        </button>

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
