export function getCurrentUser(){
  return (dispatch) => {
    dispatch({ type: 'CHECKING_CURRENT_USER' })
    fetch(`/get_current_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(user => {
        if (user.error){
          alert("Gotta log in first")
        } else {
          dispatch({ type: 'SET_CURRENT_USER', user })
        }
      })
      .catch(console.log)
  }
}


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
      .then(user => {
        if (user.error){
          alert("email or password incorrect!")
        } else {
          dispatch({ type: 'SET_CURRENT_USER', user })
        }
      })
      .catch(console.log)

  }
}
