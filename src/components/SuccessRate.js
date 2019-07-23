import React, { Component } from 'react';

export default class SuccessRate extends Component {
  render() {
    return <div>{this.props.success}%</div>;
  }
}
