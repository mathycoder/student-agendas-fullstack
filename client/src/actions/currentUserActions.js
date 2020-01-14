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
          dispatch({ type: 'SET_CURRENT_USER_TO_NONE' })
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
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: "Email or password incorrect" })
        } else {
          dispatch({ type: 'SET_CURRENT_USER', user })
          user.type === "teacher" ? history.push('/classes') : history.push('/myagenda')
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
          console.log(user.error)
        } else {
          dispatch({ type: 'CLEAR_CURRENT_USER' })
          history.push('/login')
        }
      })
      .catch(console.log)

  }
}
