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
          dispatch({ type: 'ADD_VIDEOS', videos: progressions.videos })
          dispatch({ type: 'ADD_REFLECTIONS', reflections: progressions.reflections })
          dispatch({ type: 'ADD_PROGRESSIONS', progressions: progressions.progressions })
        }
    })
  }
}

export function addProgression(progression, history) {
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
        if (progression.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: progression.error })
        } else {
          dispatch({ type: 'ADD_PROGRESSION', progression })
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: "Progression Added" })
          history.push('/progressions')
        }
      })
  }
}

export function editProgression(progression, history) {
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
        if (progression.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: progression.error })
        } else {
          dispatch({ type: 'EDIT_PROGRESSION', progression })
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: "Progression Edited" })
          history.push('/progressions')
        }
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
      .then(json => {
        dispatch({ type: 'DELETE_PROGRESSION', progression: json.progression, studentProgressions: json.studentProgressions})
      })

  }
}
