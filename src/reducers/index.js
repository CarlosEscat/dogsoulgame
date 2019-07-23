import { combineReducers } from 'redux';
import breeds from './breeds';
import imagesDetails from './imagesDetails';
import userAnswers from './userAnswers';
import gameOne from './gameOne';

export default combineReducers({ breeds, imagesDetails, userAnswers, gameOne });
