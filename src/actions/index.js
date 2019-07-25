import request from 'superagent';

export const GAME_URL = 'GAME_URL';
export const gameUrl = payload => ({
  type: GAME_URL,
  payload
});

export const setBreedState = () => {
  return function (dispatch, getState) {
    if (getState().breeds.length === 0) {
      return (request
        .get('https://dog.ceo/api/breeds/list/all')
        .then(response => {
          dispatch({
            type: 'SET_BREED_STATE',
            payload: Object.keys(response.body.message)
          })
          // this.props.breeds.map(breed => this.requirePhotos(breed))
        })
        .catch(console.error)
      )
    }
  }
}