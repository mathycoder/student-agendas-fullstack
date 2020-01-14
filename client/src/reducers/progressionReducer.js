import { combineReducers } from 'redux'

const progressionReducer = combineReducers({
  byId: progressionsById,
  allIds: allProgressions
})

export default progressionReducer

function progressionsById(state = {}, action) {
  switch(action.type) {

    case 'CLEAR_CURRENT_USER':
      return {}

    case 'START_ADDING_PROGRESSIONS_REQUEST':
      return {
        ...state
      }

    case 'ADD_PROGRESSIONS':
      const normalizedObject = {}
      action.progressions.forEach(progression => {
        progression.items = progression.items.sort((a,b) => {
          return a.progression_index - b.progression_index
        })
        progression.items = progression.items.map(item => {
          return item.video ? `video${item.video.id}` : `reflection${item.reflection.id}`
        })
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

      newProgression.items = newProgression.items.sort((a,b) => {
        return a.progression_index - b.progression_index
      })
      newProgression.items = newProgression.items.map(item => {
        return item.video ? `video${item.video.id}` : `reflection${item.reflection.id}`
      })
      const progressionId = `progression${newProgression.id}`
      return {
        ...state,
        [progressionId]: newProgression
      }

    case 'START_EDITING_PROGRESSION_REQUEST':
      return {...state}

    case 'EDIT_PROGRESSION':
      const editedProgression = {...action.progression}
      editedProgression.items = editedProgression.items.sort((a,b) => {
        return a.progression_index - b.progression_index
      })
      editedProgression.items = editedProgression.items.map(item => (
        item.video ? `video${item.video.id}` : `reflection${item.reflection.id}`
      ))
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

    case 'CLEAR_CURRENT_USER':
      return []

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
