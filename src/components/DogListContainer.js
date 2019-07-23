import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import DogsList from './DogList'
import DogDetailsContainer from './DogDetailsContainer';

class DogsListContainer extends Component {
  componentDidMount() {
    request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const action = {
          type: 'SET_BREED_STATE',
          payload: Object.keys(response.body.message)
        }
        this.props.dispatch(action)
      })
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <DogsList dogBreeds={this.props.breeds} />
        <DogDetailsContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    breeds: state
  }
}

export default connect(mapStateToProps)(DogsListContainer)
