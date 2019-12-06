import { combineReducers } from 'redux'

const reflectionReducer = combineReducers({
  byId: reflectionsById,
  allIds: allReflections
})

export default reflectionReducer

function reflectionsById(state = {}, action) {
  switch(action.type) {

    case 'CLEAR_CURRENT_USER':
      return {}

    case 'START_ADDING_REFLECTIONS_REQUEST':
      return {...state}

    case 'ADD_REFLECTIONS':
      const normalizedObject = {}
      action.reflections.forEach(reflection => {
        normalizedObject[`reflection${reflection.id}`] = reflection
      })
      return {
        ...normalizedObject
      }

    case 'ADD_PROGRESSION':
      const normalizedObj = {}
      action.progression.items.forEach(item => {
        if (item.reflection) {
          normalizedObj[`reflection${item.reflection.id}`] = item.reflection
        }

      })

      return {
        ...state,
        ...normalizedObj
      }

    case 'EDIT_PROGRESSION':
      const normObj = {}
      action.progression.items.forEach(item => {
        if (item.reflection) {
          normObj[`reflection${item.reflection.id}`] = item.reflection
        }

      })

      return {
        ...state,
        ...normObj
      }

    default:
      return state
  }
}

function allReflections(state = [], action) {

  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return []

    case 'ADD_REFLECTIONS':
      return [
        'reflectionFiller', ...action.reflections.map(reflection => `reflection${reflection.id}`)
      ]

    case 'ADD_PROGRESSION':
      const newItemsWithReflections = action.progression.items.filter(item => item.reflection)

      return [
        ...state, ...newItemsWithReflections.map(item => `reflection${item.reflection.id}`)
      ]

    case 'EDIT_PROGRESSION':
      const editedItemsWithReflections = action.progression.items.filter(item => item.reflection)

      return [
        ...state, ...editedItemsWithReflections.map(item => `reflection${item.reflection.id}`)
      ]

    default:
      return state
  }
}
