import randomIndex from '../components/randomIndex';
import request from 'superagent';

// export const SET_BREED_STATE = 'SET_BREED_STATE';
// export const setBreedState = payload => ({
//   type: SET_BREED_STATE,
//   payload
// });

export const GAME_URL = 'GAME_URL';
export const gameUrl = payload => ({
  type: GAME_URL,
  payload
});

export const GAME_ONE_OPTIONS = 'GAME_ONE_OPTIONS';
export const addGameOneOptions = () => (dispatch, getState) => {
  const state = getState();

  let arrayOfDogs = [];

  for (let i = 0; i < state.difficulty * 3; i++)
    arrayOfDogs.push(state.breeds[randomIndex(getState().breeds.length)]);

  dispatch({
    type: GAME_ONE_OPTIONS,
    payload: arrayOfDogs
  });
};

export const setBreedState = () => {
  return function(dispatch, getState) {
    if (getState().breeds.length === 0) {
      return request
        .get('https://dog.ceo/api/breeds/list/all')
        .then(response => {
          dispatch({
            type: 'SET_BREED_STATE',
            payload: Object.keys(response.body.message)
          });
        })
        .catch(console.error);
    }
  };
};
