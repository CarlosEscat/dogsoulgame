import { combineReducers } from 'redux';
import reducer from './reducer';
import imagesDetails from './imagesDetails'

export default combineReducers({ reducer, imagesDetails });
