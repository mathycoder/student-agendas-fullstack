import { combineReducers } from 'redux'

const reflectionReducer = combineReducers({
  byId: reflectionsById,
  allIds: allReflections
})

export default reflectionReducer

function reflectionsById(state = {}, action) {
  switch(action.type) {

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

    default:
      return state
  }
}

function allReflections(state = [], action) {

  switch(action.type) {

    case 'ADD_REFLECTIONS':
      return [
        'reflectionFiller', ...action.reflections.map(reflection => `reflection${reflection.id}`)
      ]

    case 'ADD_PROGRESSION':
      const newItemsWithReflections = action.progression.items.filter(item => item.reflection)

      return [
        ...state, ...newItemsWithReflections.map(item => `reflection${item.reflection.id}`)
      ]

    default:
      return state
  }
}
