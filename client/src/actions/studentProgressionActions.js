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

export function deleteStudentProgression(student, progression){
  return (dispatch) => {
    dispatch({type: 'START_REMOVE_PROGRESSION_FROM_STUDENT_REQUEST'})

    fetch(`/students/${student.id}/progressions/${progression.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(studentProgression => dispatch({ type: 'REMOVE_STUDENT_FROM_PROGRESSION', studentProgression }))

  }
}
