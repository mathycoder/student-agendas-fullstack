// synchronous action creator!
export function setCurrentUser(user){
    return {type: 'SET_CURRENT_USER', user}
}


// asynchronous action creator!
export function login(credentials){
  return (dispatch) => {
    dispatch({type: 'LOGIN_REQUEST'})
    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(resp => resp.json())
      .then(user => dispatch({ type: 'SET_CURRENT_USER', user }))
  }
}
