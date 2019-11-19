import { combineReducers } from 'redux'

const studentProgressionReducer = combineReducers({
  byId: studentProgressionsById,
  allIds: allStudentProgressions
})

export default studentProgressionReducer

function studentProgressionsById(state = {}, action) {
  switch(action.type) {
    case 'ADD_STUDENTS':
    const normalizedObject = {}
    action.studentProgressions.forEach(stProg => {
      normalizedObject[`studentProgression${stProg.id}`] = {
        id: stProg.id,
        agendaIndex: stProg.agenda_index,
        studentId: `student${stProg.student_id}`,
        progressionId: `progression${stProg.progression_id}`
      }
    })
    return {
      ...normalizedObject
    }

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
          studentId: `student${student_id}`,
          progressionId: `progression${progression_id}`
        }
      }

    default:
      return state
  }
}

function allStudentProgressions(state = [], action) {

  switch(action.type) {

    case 'ADD_STUDENTS':
    return [
      ...action.studentProgressions.map(stPr => `studentProgression${stPr.id}`)
    ]

    case 'ADD_STUDENT_PROGRESSION':
    return [
      ...state, `studentProgression${action.studentProgression.id}`
    ]

    default:
      return state
  }
}
