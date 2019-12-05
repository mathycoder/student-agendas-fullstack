export function fetchReflections() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_REFLECTIONS_REQUEST'})
    fetch(`/reflections`, {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      method: "GET"
    })
      .then(resp => resp.json())
      .then(reflections => {
        if (reflections.error){
          console.log("Can't load reflections")
        } else {
          dispatch({ type: 'ADD_REFLECTIONS', reflections })
        }  
      })
  }
}
