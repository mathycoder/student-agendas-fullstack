import { combineReducers } from 'redux'

const progressionReducer = combineReducers({
  byId: progressionsById,
  allIds: allProgressions
})

export default progressionReducer

function progressionsById(state = {}, action) {
  switch(action.type) {

    case 'START_ADDING_PROGRESSIONS_REQUEST':
      return {
        ...state
      }

    case 'ADD_PROGRESSIONS':
      const normalizedObject = {}
      action.progressions.forEach(progression => {
        normalizedObject[`progression${progression.id}`] = progression
      })
     return {
       ...normalizedObject
     }

    default:
      return state
  }
}


function allProgressions(state = [], action) {

  switch(action.type) {

    case 'ADD_PROGRESSIONS':
      return [
        ...action.progressions.map(progression => `progression${progression.id}`)
      ]

    default:
      return state
  }
}
