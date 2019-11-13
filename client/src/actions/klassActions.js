export function fetchKlasses() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_KLASSES_REQUEST'})
    fetch(`/klasses`)
      .then(resp => resp.json())
      .then(klasses => dispatch({ type: 'ADD_KLASSES', klasses }))
  }
}

export function addKlass(klass){
  return (dispatch) => {
    dispatch({type: 'START_ADDING_KLASS_REQUEST'})
    fetch('/klasses', {
      method: "POST",
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

export function removeKlass(klassId){
  return (dispatch) => {
    dispatch({type: 'START_REMOVING_KLASS_REQUEST'})
    fetch(`/klasses/${klassId}`, {
      method: 'DELETE',
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
