import { combineReducers } from 'redux';
import reducer from './reducer';
import images from './images'

export default combineReducers({ reducer, images });
