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

    default:
      return state
  }
}
