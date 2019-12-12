import { combineReducers } from 'redux'

const studentProgressionReducer = combineReducers({
  byId: studentProgressionsById,
  allIds: allStudentProgressions
})

export default studentProgressionReducer

function studentProgressionsById(state = {}, action) {
  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return {}

    case 'ADD_STUDENTS':
    const normalizedObject = {}
    action.studentProgressions.forEach(stProg => {
      normalizedObject[`studentProgression${stProg.id}`] = {
        id: stProg.id,
        agendaIndex: stProg.agenda_index,
        studentId: `student${stProg.student_id}`,
        progressionId: `progression${stProg.progression_id}`,
        submitted: stProg.submitted
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
      const { id, agenda_index, student_id, progression_id, submitted } = action.studentProgression
      return {
        ...state,
        [`studentProgression${id}`]: {
          id: id,
          agendaIndex: agenda_index,
          studentId: `student${student_id}`,
          progressionId: `progression${progression_id}`,
          submitted: submitted
        }
      }

    case 'START_SWITCH_PROGRESSION_REQUEST':
      const allSps = {...state}
      const modifiedObjs = switchAgendaOrder(action, allSps)
      return {...state, modifiedObjs }

    case 'SWITCH_PROGRESSION':
      const normalizedObj = {}
      action.studentProgressions.forEach(sp => {
        normalizedObj[`studentProgression${sp.id}`] = {
          id: sp.id,
          agendaIndex: sp.agenda_index,
          studentId: `student${sp.student_id}`,
          progressionId: `progression${sp.progression_id}`,
          submitted: sp.submitted
        }
      })
      return {...state, ...normalizedObj}

    case 'UPDATE_STUDENT_PROGRESSION':
      const sp = action.studentProgression
      const normalObj  = {
        id: sp.id,
        agendaIndex: sp.agenda_index,
        studentId: `student${sp.student_id}`,
        progressionId: `progression${sp.progression_id}`,
        submitted: sp.submitted
      }
      return {
        ...state,
        [`studentProgression${sp.id}`]: normalObj
      }

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
    case 'CLEAR_CURRENT_USER':
      return []

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

function switchAgendaOrder(action, allSps){
  let currStProgression
  let myStudentProgressions = []
  const studId = `student${action.draggableId.split("-")[1]}`
  const progId = `progression${action.draggableId.split("-")[3]}`
  for(const sp in allSps){
    if (allSps[sp].studentId === studId) {
      myStudentProgressions.push(allSps[sp])
    }
    if (allSps[sp].studentId === studId && allSps[sp].progressionId === progId){
      currStProgression = allSps[sp]
    }
  }

  myStudentProgressions = myStudentProgressions.sort((a,b) => a.agendaIndex - b.agendaIndex)
  myStudentProgressions = myStudentProgressions.filter(sp => sp.id !== currStProgression.id)
  myStudentProgressions.splice(action.newIndex, 0, currStProgression)

  const modifiedObj = {}
  myStudentProgressions.forEach((sp, index) => {
    sp.agendaIndex = index
    modifiedObj[`studentProgression${sp.id}`] = sp
  })
  return modifiedObj
}
