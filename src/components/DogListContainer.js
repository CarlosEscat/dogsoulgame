import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Mousetrap from 'mousetrap'
import { setBreedState } from '../actions';
import { setDifficulty } from '../actions/setDifficulty'

import './GameContainer.css'

class DogsListContainer extends Component {
  //state for keyboard shortcut
  state = {
    redirect: false
  }

  componentDidMount() {
    //fetching the array of breeds
    this.props.setBreedState()

    //setting the initial level of difficulty to 1
    if (parseInt(this.props.difficulty) < 1) {
      this.props.setDifficulty(1)
    }
    //keyboard shortcut listener
    Mousetrap.bind(['x'], this.setRedirect);
  }

  componentWillUnmount() {
    Mousetrap.unbind(['x'], this.setRedirect);
  }

  //setRedirect and renderRedirect used for keyboard Shortcut to start the game
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  //navigating to the game mix
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/gamemix' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <NavLink to="/gameone">
          <button className='navigation-button'>Start First Game</button>
        </NavLink>
        <NavLink to="/gametwo">
          <button className='navigation-button'>Start Second Game</button>
        </NavLink>
        <NavLink to="/gamemix">
          <button className='navigation-button'>Start Game Mix</button>
        </NavLink>
        <NavLink to="/doglist">
          <button className='navigation-button'>Learn dog breeds</button>
        </NavLink>
        <h1>Press x to start the random game!</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds,
  difficulty: state.difficulty
});

export default connect(
  mapStateToProps,
  { setDifficulty, setBreedState }
)(DogsListContainer);
