export function addStudentProgression(student, progression) {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_STUDENT_PROGRESSION_REQUEST'})
    const params = {
      student: {
        progressionId: progression.id
      }
    }
    fetch(`/students/${student.id}/progressions`, {
      method: 'POST',
      credentials: "include",
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
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(studentProgression => dispatch({ type: 'REMOVE_STUDENT_FROM_PROGRESSION', studentProgression }))

  }
}

export function switchStudentProgression(draggableId, newIndex){
  return (dispatch) => {
    dispatch({type: 'START_SWITCH_PROGRESSION_REQUEST', draggableId, newIndex})
    const params = {
      student: {
        newIndex: newIndex
      }
    }
    const studentId = draggableId.split("-")[1]
    const progressionId = draggableId.split("-")[3]
    fetch(`/students/${studentId}/progressions/${progressionId}`, {
      method: 'PATCH',
      credentials: "include",
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(studentProgressions => dispatch({ type: 'SWITCH_PROGRESSION', studentProgressions }))
  }
}
