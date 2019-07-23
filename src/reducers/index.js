import { combineReducers } from 'redux';
import breeds from './breeds';
import imagesDetails from './imagesDetails'
import userAnswers from './userAnswers'

export default combineReducers({ breeds, imagesDetails, userAnswers });
