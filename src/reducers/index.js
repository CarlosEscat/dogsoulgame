import { combineReducers } from 'redux';
import breeds from './breeds';

import imagesDetails from './imagesDetails'
import userAnswers from './userAnswers'
import imagesObjects from './imagesObjects'

import game from './gameOne';
import BreedsAlreadySeen from './breedsOrderGame'
import difficulty from './difficulty'

export default combineReducers({ breeds, imagesDetails, userAnswers, imagesObjects, game, BreedsAlreadySeen, difficulty });


