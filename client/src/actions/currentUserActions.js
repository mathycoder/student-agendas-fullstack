export function getCurrentUser(history){
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
          history.push('/login')
        } else {
          dispatch({ type: 'SET_CURRENT_USER', user })
        }
      })
      .catch(console.log)
  }
}


export function login(credentials, history){
  return (dispatch) => {
    dispatch({type: 'LOGIN_REQUEST'})
    fetch(`/login`, {
      credentials: "include",
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
          history.push('/classes')
        }
      })
      .catch(console.log)

  }
}

export function logout(history){
  return (dispatch) => {
    dispatch({type: 'LOGOUT_REQUEST'})
    fetch(`/logout`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(user => {
        if (user.error){
          alert("logout failed")
        } else {
          dispatch({ type: 'CLEAR_CURRENT_USER' })
          history.push('/login')
        }
      })
      .catch(console.log)

  }
}
