import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameContainer extends Component {
  render() {
    return (
      <div>
        <br /> Hallo
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    breeds: state
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(GameContainer);
