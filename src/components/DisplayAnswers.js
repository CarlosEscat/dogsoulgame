import React from 'react'
import { connect } from 'react-redux'
import { addUserAnswer } from '../actions/userAnswers'

class DisplayAnswers extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addUserAnswer(true)
    console.log('Am adding to the state and this.props is:', this.props)
  }

  render() {
    const name = this.props.answer
    const randomName1 = this.props.breeds[4];
    const randomName2 = this.props.breeds[5];
    console.log(name)
    return (
      <div>
        <button onClick={this.handleClick}>{name}</button>
        <button onClick={this.handleClick}>{randomName1}</button>
        <button onClick={this.handleClick}>{randomName2}</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('State is:', state)
  return {
    userAnswers: state.userAnswers,
    breeds: state.breeds
  }
}

export default connect(mapStateToProps, { addUserAnswer })(DisplayAnswers)