export function addStudents(klassId){
  return (dispatch) => {
    dispatch({type: 'START_ADDING_STUDENTS_REQUEST'})
    fetch(`/klasses/${klassId}/students`)
      .then(resp => resp.json())
      .then(json => {
        const students = json.students
        const studentProgressions = json.student_progressions
        dispatch({type: 'ADD_STUDENTS', students, studentProgressions})
      })
  }
}


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

export function editStudentInKlass(klassId, studentData){
  return (dispatch) => {
    dispatch({type: 'START_EDITING_STUDENT_IN_KLASS_REQUEST'})
    fetch(`/klasses/${klassId}/students/${studentData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(studentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(student => {
        dispatch({ type: 'EDIT_STUDENT_IN_KLASS', student })
      })
  }
}

export function removeStudentFromKlass(studentData){
  return (dispatch) => {
    dispatch({type: 'START_REMOVING_STUDENT_FROM_KLASS_REQUEST'})
    fetch(`/klasses/${studentData.klass_id}/students/${studentData.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(student => {
        dispatch({ type: 'REMOVE_STUDENT_FROM_KLASS', student })

      })
  }
}
