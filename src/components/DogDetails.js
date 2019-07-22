import React from 'react'
import { Link } from 'react-router-dom'
import './DogDetails.css'

export default function DogBreedImages (props) {
  const { images } = props

  return (
    <div>
      <h1>Images of the { props.breed } breed</h1>
      
      <Link to="/">Go back to the index</Link>

      <div>
        { images && images.map(url => <img className="dog-breed-images" src={ url } alt="Dog" />) }
        { !images && 'Loading...' }
      </div>
    </div>
  )
}