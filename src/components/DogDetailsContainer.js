import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import DogDetails from './DogDetails'

import { addBreedImages } from '../actions/addBreedImages'

// ${encodeURIComponent(breed)}

class DogDetailsContainer extends Component {
  componentDidMount() {
    // const breed = 'hound'
    // this.props.match.params.breed
    request
      .get(`https://dog.ceo/api/breed/hound/images`)
      .then(response => {
        this.props.addBreedImages(response.body.message)
      })
      .catch(console.error)
  }

  render() {
    console.log('Details Container reducer props:', this.props)
    return <DogDetails images={ this.props.images } breed='hound' />
  }
}

// {this.props.match.params.breed}

const mapStateToProps = (state) => {
  console.log('DogDetailsContainer sending to state:', state)
  return {
    images: state.images
  }
}

export default connect(mapStateToProps, { addBreedImages })(DogDetailsContainer)