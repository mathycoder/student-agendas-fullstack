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
        progression.videos = progression.videos.map(video => `video${video.id}`)
        normalizedObject[`progression${progression.id}`] = progression
      })

     return {
       ...normalizedObject
     }

    case 'START_DELETING_PROGRESSION_REQUEST':
      return {
        ...state
      }

    case 'DELETE_PROGRESSION':
      const deleteProgressionId = `progression${action.progression.id}`
      const { [deleteProgressionId]: value, ...newState  } = state

      return {
        ...newState
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

    case 'DELETE_PROGRESSION':
      const progressionIdToDelete = `progression${action.progression.id}`
      return state.filter(pId => pId !== progressionIdToDelete)

    default:
      return state
  }
}
