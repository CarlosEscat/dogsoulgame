import { GAME_ONE_URL } from '../actions';

const initialState = {
  url: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME_ONE_URL:
      return (state.url = payload);

    default:
      return state;
  }
};
