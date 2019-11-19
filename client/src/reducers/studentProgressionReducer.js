import { combineReducers } from 'redux'

const studentProgressionReducer = combineReducers({
  byId: studentProgressionsById,
  allIds: allStudentProgressions
})

export default studentProgressionReducer

function studentProgressionsById(state = {}, action) {
  switch(action.type) {

    default:
      return state
  }
}

function allStudentProgressions(state = [], action) {

  switch(action.type) {

    default:
      return state
  }
}
