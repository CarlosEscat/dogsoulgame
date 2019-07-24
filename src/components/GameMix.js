import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameContainer from './GameContainer';
import SecondGameContainer from './SecondGameContainer';

import './GameContainer.css';

class GameMix extends Component {
  state = { game: false };

  handleSubmit = event => {
    event.preventDefault();

    console.log(event.target);

    if (event.target.id.includes('http')) {
      if (this.props.game === this.target.id) console.log('correct');
      else console.log('no way');
    } else if (event.target.class.includes('answer-button')) {
      if (this.props.game === this.target.value) console.log('correct');
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
