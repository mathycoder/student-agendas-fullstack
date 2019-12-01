export function fetchReflections() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_REFLECTIONS_REQUEST'})
    fetch(`/reflections`)
      .then(resp => resp.json())
      .then(reflections => {
        dispatch({ type: 'ADD_REFLECTIONS', reflections })
      })
  }
}
