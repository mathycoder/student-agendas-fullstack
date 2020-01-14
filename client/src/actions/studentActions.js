export function addStudents(klassId){
  console.log("C")
  return (dispatch) => {
    dispatch({type: 'START_ADDING_STUDENTS_REQUEST'})
    fetch(`/klasses/${klassId}/students`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(json => {
        console.log("D")
        const students = json.students
        const studentProgressions = json.student_progressions
        dispatch({type: 'ADD_STUDENTS', students, studentProgressions})
      })
  }
  console.log("E")
}

export function addStudentToKlass(klassId, studentData){
  return (dispatch) => {
    dispatch({type: 'START_ADDING_STUDENT_TO_KLASS_REQUEST'})
    fetch(`/klasses/${klassId}/students`, {
      method: 'post',
      body: JSON.stringify(studentData),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: student.error })
        } else {
          dispatch({ type: 'ADD_STUDENT_TO_KLASS', student })
        }
      })
  }
}

export function editStudentInKlass(klassId, studentData){
  return (dispatch) => {
    dispatch({type: 'START_EDITING_STUDENT_IN_KLASS_REQUEST'})
    fetch(`/klasses/${klassId}/students/${studentData.id}`, {
      method: 'PATCH',
      credentials: "include",
      body: JSON.stringify(studentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: student.error })
        } else {
          dispatch({ type: 'EDIT_STUDENT_TO_KLASS', student })
        }
      })
  }
}

export function removeStudentFromKlass(studentData){
  return (dispatch) => {
    dispatch({type: 'START_REMOVING_STUDENT_FROM_KLASS_REQUEST'})
    fetch(`/klasses/${studentData.klass_id}/students/${studentData.id}`, {
      method: 'DELETE',
      credentials: "include",
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

export function fetchStudentData(student){
  return (dispatch) => {
    dispatch({type: 'START_FETCHING_STUDENT_DATA'})
    fetch(`/klasses/${student.klass_id}/students/${student.id}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(student => {
        dispatch({ type: 'ADD_VIDEOS', videos: student.videos })
        dispatch({ type: 'ADD_REFLECTIONS', reflections: student.reflections })
        dispatch({ type: 'ADD_PROGRESSIONS', progressions: student.progressions, studentProgressions: student.student_progressions })
        dispatch({type: 'ADD_STUDENTS', students: student.students, studentProgressions: student.student_progressions})
      })
  }
}
