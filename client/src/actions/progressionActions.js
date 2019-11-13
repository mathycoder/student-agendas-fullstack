export function fetchProgressions() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_PROGRESSIONS_REQUEST'})
    fetch(`/progressions`)
      .then(resp => resp.json())
      .then(progressions => dispatch({ type: 'ADD_PROGRESSIONS', progressions }))
  }
}
