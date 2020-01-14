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
    return {
      ...normalizedObjectCreator(action.studentProgressions)
    }

    case 'START_ADDING_STUDENT_PROGRESSION_REQUEST':
      return {
        ...state
      }

    case 'ADD_STUDENT_PROGRESSION':
      return {
        ...state,
        ...normalizedObjectCreator([action.studentProgression])
      }

    case 'ADD_STUDENT_PROGRESSIONS':
    return {
      ...state,
      ...normalizedObjectCreator(action.studentProgressions)
    }

    case 'START_SWITCH_PROGRESSION_REQUEST':
      const allSps = {...state}
      const modifiedObjs = switchAgendaOrder(action, allSps)
      return {...state, modifiedObjs }

    case 'SWITCH_PROGRESSION':
      return {...state, ...normalizedObjectCreator(action.studentProgressions)}

    case 'UPDATE_STUDENT_PROGRESSION':
      return {
        ...state,
        ...normalizedObjectCreator([action.studentProgression])
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

    case 'ADD_STUDENT_PROGRESSIONS':
    return [
      ...state,
      ...action.studentProgressions.map(stPr => `studentProgression${stPr.id}`)
    ]

    case 'ADD_STUDENT_PROGRESSION':
    return [
      ...state, `studentProgression${action.studentProgression.id}`
    ]

    case 'REMOVE_STUDENT_FROM_PROGRESSION':
      const stProgIdToDelete = `studentProgression${action.studentProgression.id}`
      return state.filter(pId => pId !== stProgIdToDelete)

    case 'DELETE_PROGRESSION':
      const spsToRemove = action.studentProgressions.map(sp => `studentProgression${sp.id}`)
      return state.filter(sp => !spsToRemove.includes(sp))
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

function normalizedObjectCreator(studentProgressions){
  const normalizedObject = {}
  studentProgressions.forEach(stProg => {
    normalizedObject[`studentProgression${stProg.id}`] = {
      id: stProg.id,
      agendaIndex: stProg.agenda_index,
      studentId: `student${stProg.student_id}`,
      progressionId: `progression${stProg.progression_id}`,
      submitted: stProg.submitted,
      submittedAt: stProg.submitted_at,
      createdAt: stProg.created_at,
      updatedAt: stProg.updated_at,
      question1Answer: stProg.question1_answer,
      question1Comment: stProg.question1_comment,
      graded: stProg.graded,
      gradedAt: stProg.graded_at,
      archived: stProg.archived
    }
  })
  return normalizedObject
}
