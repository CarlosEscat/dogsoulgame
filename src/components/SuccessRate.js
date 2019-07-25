import React, { Component } from 'react';

export default class SuccessRate extends Component {
  successToPercentage = answers => {
    const successRate =
      (answers.filter(answer => answer === true).length / answers.length) * 100;

    return answers.length < 1 ? 0 : successRate.toFixed(0);
  };

  render() {
    return (
      <div>
        <h3>Success Rate: {this.successToPercentage(this.props.success)}%</h3>
        {/* <h3>Correct {this.props.success}</h3> */}
      </div>
    );
  }
}
