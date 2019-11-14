export function fetchProgressions() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_PROGRESSIONS_REQUEST'})
    fetch(`/progressions`)
      .then(resp => resp.json())
      .then(progressions => dispatch({ type: 'ADD_PROGRESSIONS', progressions }))
  }
}

export function addProgression(progression) {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_PROGRESSION_REQUEST'})
    fetch(`/progressions`, {
      method: "POST",
      body: JSON.stringify(progression),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(progression => {
        dispatch({ type: 'ADD_PROGRESSION', progression })
      })

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
