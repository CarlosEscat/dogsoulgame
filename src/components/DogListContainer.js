import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import DogsList from './DogList'

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
    return <DogsList dogBreeds={this.props.breeds} />
  }
}

const mapStateToProps = (state) => {
  return {
    breeds: state
  }
}

export default connect(mapStateToProps)(DogsListContainer)
