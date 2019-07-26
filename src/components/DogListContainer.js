import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import Mousetrap from "mousetrap";
import { setBreedState } from "../actions";
import { setDifficulty } from "../actions/setDifficulty";

import "./GameContainer.css";
import "./DogListContainer.css";

class DogsListContainer extends Component {
  //state for keyboard shortcut
  state = {
    redirect: false
  };

  componentDidMount() {
    //fetching the array of breeds
    this.props.setBreedState();

    //setting the initial level of difficulty to 1
    if (parseInt(this.props.difficulty) < 1) {
      this.props.setDifficulty(1);
    }
    //keyboard shortcut listener
    Mousetrap.bind(["x"], this.setRedirect);
  }

  componentWillUnmount() {
    Mousetrap.unbind(["x"], this.setRedirect);
  }

  //setRedirect and renderRedirect used for keyboard Shortcut to start the game
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  //navigating to the game mix
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/gamemix" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div>
          <NavLink to="/gameone">
            <img className='button' alt='First game' src='../images/image_first_game.jpg' />
          </NavLink>
          <NavLink to="/gametwo">
            <img className='button' alt='Second game' src='../images/image_second_game.jpg' />
          </NavLink>
          <NavLink to="/gamemix">
            <img className='button' alt='Game Mix' src='../images/image_game_mix.jpg' />
          </NavLink>
          <NavLink to="/doglist">
            <img className='button' alt='First game' src='../images/image_dog_breeds.jpg' />
          </NavLink>
        </div>
        <div className='main-image'>
          <img alt='Press x to start the random game!' src='../images/puppy-dog.jpg' />
        </div>

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
