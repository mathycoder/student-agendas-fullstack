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
        progression.videos = progression.videos.sort((a,b) => {
          return a.progression_index - b.progression_index
        })
        progression.videos = progression.videos.map(video => `video${video.id}`)
        normalizedObject[`progression${progression.id}`] = progression
      })

     return {
       ...normalizedObject
     }

    case 'START_ADDING_PROGRESSION_REQUEST':
      return {
        ...state
      }

    case 'ADD_PROGRESSION':
      const newProgression = {...action.progression}
      newProgression.videos = newProgression.videos.sort((a,b) => {
        return a.progression_index - b.progression_index
      })
      newProgression.videos = newProgression.videos.map(video => `video${video.id}`)
      const progressionId = `progression${newProgression.id}`
      return {
        ...state,
        [progressionId]: newProgression
      }

    case 'START_EDITING_PROGRESSION_REQUEST':
      return {...state}

    case 'EDIT_PROGRESSION':
      const editedProgression = {...action.progression}
      editedProgression.videos = editedProgression.videos.sort((a,b) => {
        return a.progression_index - b.progression_index
      })
      editedProgression.videos = editedProgression.videos.map(video => `video${video.id}`)
      const progId = `progression${editedProgression.id}`


      return {
        ...state, [progId]: editedProgression
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

    case 'ADD_PROGRESSION':
      const progressionId = `progression${action.progression.id}`
      return [...state, progressionId]

    case 'DELETE_PROGRESSION':
      const progressionIdToDelete = `progression${action.progression.id}`
      return state.filter(pId => pId !== progressionIdToDelete)

    default:
      return state
  }
}
