export function fetchKlasses() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_KLASSES_REQUEST'})
    fetch(`/klasses`)
      .then(resp => resp.json())
      .then(klasses => dispatch({ type: 'ADD_KLASSES', klasses }))
  }
}
