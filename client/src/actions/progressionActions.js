export function fetchProgressions() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_PROGRESSIONS_REQUEST'})
    fetch(`/progressions`)
      .then(resp => resp.json())
      .then(progressions => dispatch({ type: 'ADD_PROGRESSIONS', progressions }))
  }
}

export function deleteProgression(progression) {
  return (dispatch) => {
    dispatch({type: 'START_DELETING_PROGRESSION_REQUEST'})
    fetch(`/progressions/${progression.id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(progression => dispatch({ type: 'DELETE_PROGRESSION', progression }))
  }
}
