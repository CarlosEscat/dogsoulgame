import React, { Component } from 'react';
import './SuccessRate.css';

export default class SuccessRate extends Component {
  successRateObject = answers => {
    const successRate = answers.filter(answer => answer === true).length,
      failureRate = answers.length - successRate,
      successRatePercentage = (answers.length < 1
        ? 0
        : (successRate / answers.length) * 100
      ).toFixed(0);

    return {
      percentage: successRatePercentage,
      correct: successRate,
      wrong: failureRate
    };
  };

  render() {
    const { percentage, correct, wrong } = this.successRateObject(
      this.props.success
    );

    return (
      <div className='statistic-container'>
        <h3 className='statistic'>Difficulty level: {this.props.difficulty}</h3>
        <h3 className='statistic'>Success Rate: {percentage}%</h3>
        <h3 className='statistic'>Correct: {correct}</h3>
        <h3 className='statistic'>Wrong: {wrong}</h3>
      </div>
    );
  }
}
