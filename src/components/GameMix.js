import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameContainer from './GameContainer';
import SecondGameContainer from './SecondGameContainer';

import './GameContainer.css';

class GameMix extends Component {
  state = { game: false };

  handleSubmit = event => {
    event.preventDefault();

    if (event.target.id.includes('https')) {
      if (this.props.game.url === event.target.id) console.log('correct');
      else console.log('no way');
    } else if (event.target.className === 'answer-button') {
      if (this.props.game.correctAnswer === event.target.value)
        console.log('correct');
      else console.log('no way');
    }

    this.setState({ game: !this.state.game });
  };

  render() {
    return (
      <div>
        {this.state.game ? (
          <GameContainer handleSubmit={this.handleSubmit} />
        ) : (
          <SecondGameContainer handleSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  game: state.game
});

export default connect(mapStateToProps)(GameMix);
