import { GAME_URL } from '../actions/index';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GAME_URL:
      return payload;

    default:
      return state;
  }
};
