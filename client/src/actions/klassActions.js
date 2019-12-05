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
      .then(klasses => {
        if (klasses.error){
          console.log("can't load klasses when not logged in")
        } else {
          dispatch({ type: 'ADD_KLASSES', klasses })
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
        dispatch({ type: 'ADD_KLASS', klass })
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
        dispatch({ type: 'EDIT_KLASS', klass })
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
