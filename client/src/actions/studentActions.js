export function addStudentToKlass(klassId, studentData){
  return (dispatch) => {
    dispatch({type: 'START_ADDING_STUDENT_TO_KLASS_REQUEST'})
    fetch(`/klasses/${klassId}/students`, {
      method: 'post',
      body: JSON.stringify(studentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(student => {
        dispatch({ type: 'ADD_STUDENT_TO_KLASS', student })
      })
  }
}
