import { combineReducers } from 'redux'

const studentReducer = combineReducers({
  byId: studentsById,
  allIds: allStudents
})

export default studentReducer

function studentsById(state = {}, action) {
  switch(action.type) {
    case 'START_ADDING_STUDENTS_REQUEST':
      return {
        ...state
      }

    case 'ADD_STUDENTS':
      const normalizedObject = {}
      action.students.forEach(student => {
        normalizedObject[`student${student.id}`] = student
      })

      return {
        ...normalizedObject
      }

    case 'START_ADDING_STUDENT_TO_KLASS_REQUEST':
      return {
        ...state
      }

    case 'ADD_STUDENT_TO_KLASS':
      const newStudentId = `student${action.student.id}`

      return {
        ...state,
        [newStudentId]: action.student
      }

    case 'START_REMOVING_STUDENT_FROM_KLASS_REQUEST':
      return {
        ...state
      }

    case 'REMOVE_STUDENT_FROM_KLASS':
      const deleteStudentId = `student${action.student.id}`
      const { [deleteStudentId]: value, ...newState  } = state

      return {
        ...newState
      }

    default:
      return state
  }
}


function allStudents(state = [], action) {

  switch(action.type) {
    case 'ADD_STUDENTS':
      return [
        ...action.students.map(student => `student${student.id}`)
      ]

    case 'ADD_STUDENT_TO_KLASS':
      const studentId = `student${action.student.id}`
      return [...state, studentId]

    case 'REMOVE_STUDENT_FROM_KLASS':
      const studentIdToDelete = `student${action.student.id}`
      return state.filter(stId => stId !== studentIdToDelete)

    default:
      return state
  }
}
