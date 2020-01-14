export function fetchKlasses() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_KLASSES_REQUEST'})
    fetch(`/klasses`, {
      credentials: "include",
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.error){
          console.log("can't load klasses when not logged in")
        } else {
          dispatch({ type: 'ADD_KLASSES', klasses: json.klasses, counts: json.counts })
        }
      })
  }
}

export function addKlass(klass){
  return (dispatch) => {
    dispatch({type: 'START_ADDING_KLASS_REQUEST', klass })
    fetch('/klasses', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(klass),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(klass => {
        if (klass.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: klass.error })
        } else {
          dispatch({ type: 'ADD_KLASS', klass })
        }
      })
  }
}

export function editKlass(klass){
  return (dispatch) => {
    dispatch({type: 'START_EDITING_KLASS_REQUEST', klass})
    fetch(`/klasses/${klass.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(klass),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(klass => {
        if (klass.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: klass.error })
        } else {
          dispatch({ type: 'EDIT_KLASS', klass })
        }
      })
  }
}

export function removeKlass(klassId){
  return (dispatch) => {
    dispatch({type: 'START_REMOVING_KLASS_REQUEST'})
    fetch(`/klasses/${klassId}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: 'REMOVE_KLASS', klassId })
      })
  }
}
