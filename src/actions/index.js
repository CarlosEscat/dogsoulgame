import randomIndex from '../components/randomIndex';

export const SET_BREED_STATE = 'SET_BREED_STATE';
export const setBreedState = payload => ({
  type: SET_BREED_STATE,
  payload
});

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
