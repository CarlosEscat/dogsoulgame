import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameContainer from './GameContainer'
import SecondGameContainer from './SecondGameContainer'

// import SuccessRate from './SuccessRate';

import './GameContainer.css';

class GameMix extends Component {
  state = {game: false}

  handleSubmit = event => {
    event.preventDefault();
    this.setState({game : !this.state.game})
  };

  render() {
    return (
      <div>
        {this.state.game ? (<GameContainer handleSubmit={this.handleSubmit}/>) : (<SecondGameContainer handleSubmit={this.handleSubmit}/>)}
      </div>
    )
  }
}
  const mapStateToProps = state => ({
    userAnswers: state.userAnswers
  });

  export default connect(
    mapStateToProps
  )(GameMix);