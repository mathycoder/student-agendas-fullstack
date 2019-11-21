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

    case 'START_SWITCH_PROGGRESSION_REQUEST':
      return {...state}

    case 'SWITCH_PROGRESSION':
      const normalizedObj = {}
      action.studentProgressions.forEach(sp => {
        normalizedObj[`studentProgression${sp.id}`] = {
          id: sp.id,
          agendaIndex: sp.agenda_index,
          studentId: `student${sp.student_id}`,
          progressionId: `progression${sp.progression_id}`
        }
      })

      return {...state, ...normalizedObj}

    case 'START_REMOVE_PROGRESSION_FROM_STUDENT_REQUEST':
      return {...state}

    case 'REMOVE_STUDENT_FROM_PROGRESSION':
      const studentProgId = `studentProgression${action.studentProgression.id}`
      const { [studentProgId]: value, ...newState  } = state

      return {
        ...newState
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

    case 'REMOVE_STUDENT_FROM_PROGRESSION':
      const stProgIdToDelete = `studentProgression${action.studentProgression.id}`
      return state.filter(pId => pId !== stProgIdToDelete)

    default:
      return state
  }
}
