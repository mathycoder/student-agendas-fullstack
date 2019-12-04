// synchronous action creator!
export function setCurrentUser(user){
    return {type: 'SET_CURRENT_USER', user}
}


// asynchronous action creator!
export function login(credentials){
  return (dispatch) => {
    dispatch({type: 'LOGIN_REQUEST'})
    fetch(`/klasses`)
      .then(resp => resp.json())
      .then(klasses => dispatch({ type: 'ADD_KLASSES', klasses }))
  }
}
