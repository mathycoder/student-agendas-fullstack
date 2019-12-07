export function signup(teacherData, history){
  return (dispatch) => {
     fetch(`/teachers`, {
       method: 'POST',
       body: JSON.stringify(teacherData),
       headers: {
         'Content-Type': 'application/json'
       },
       credentials: "include"
    })
      .then(resp => resp.json())
      .then(user => {
        if (user.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: user.error })
        } else {
          dispatch({ type: 'SET_CURRENT_USER', user })
          history.push('/classes')
        }
      })
      .catch(console.log)
  }
}
