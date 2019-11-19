export function addStudentProgression(student, progression) {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_STUDENT_PROGRESSION_REQUEST'})
    const params = {
      student: {
        progressionId: progression.id
      }
    }
    fetch(`/klasses/${student.klass_id}/students/${student.id}`, {
      method: 'PATCH',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(studentProgression => dispatch({ type: 'ADD_STUDENT_PROGRESSION', studentProgression }))
  }
}
