export function fetchProgressions() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_PROGRESSIONS_REQUEST'})
    fetch(`/progressions`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(progressions => {
        if (progressions.error){
          console.log("Can't load progressions")
        } else {
          dispatch({ type: 'ADD_PROGRESSIONS', progressions })
        }
    })
  }
}

export function addProgression(progression) {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_PROGRESSION_REQUEST'})
    fetch(`/progressions`, {
      method: "POST",
      credentials: "include",
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


export function editProgression(progression) {
  return (dispatch) => {
    dispatch({type: 'START_EDITING_PROGRESSION_REQUEST'})
    fetch(`/progressions/${progression.progression.id}`, {
      method: 'PATCH',
      credentials: "include",
      body: JSON.stringify(progression),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(progression => {
        dispatch({ type: 'EDIT_PROGRESSION', progression })
      })

  }
}

export function deleteProgression(progression) {
  return (dispatch) => {
    dispatch({type: 'START_DELETING_PROGRESSION_REQUEST'})
    fetch(`/progressions/${progression.id}`, {
      method: 'DELETE',
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(progression => dispatch({ type: 'DELETE_PROGRESSION', progression }))
  }
}
