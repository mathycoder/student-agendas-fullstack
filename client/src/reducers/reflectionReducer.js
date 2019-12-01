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

    default:
      return state
  }
}

function allReflections(state = [], action) {

  switch(action.type) {

    case 'ADD_REFLECTIONS':
      return [
        ...action.reflections.map(reflection => `reflection${reflection.id}`)
      ]

    default:
      return state
  }
}
