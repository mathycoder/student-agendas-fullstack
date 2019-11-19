import { combineReducers } from 'redux'

const studentProgressionReducer = combineReducers({
  byId: studentProgressionsById,
  allIds: allStudentProgressions
})

export default studentProgressionReducer

function studentProgressionsById(state = {}, action) {
  switch(action.type) {

    case 'START_ADDING_STUDENT_PROGRESSION_REQUEST':
      return {
        ...state
      }

    //agenda_index: 1, id: 4, student_id: 46, progression_id: 44
    case 'ADD_STUDENT_PROGRESSION':
      const { id, agenda_index, student_id, progression_id } = action.studentProgression
      return {
        ...state,
        [`studentProgression${id}`]: {
          id: id,
          agendaIndex: agenda_index,
          studentId: student_id,
          progressionId: progression_id
        }
      }

    default:
      return state
  }
}

function allStudentProgressions(state = [], action) {

  switch(action.type) {

    case 'ADD_STUDENT_PROGRESSION':
    return [
      ...state, `studentProgression${action.studentProgression.id}`
    ]

    default:
      return state
  }
}
