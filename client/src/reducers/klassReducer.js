import { combineReducers } from 'redux'

const klassReducer = combineReducers({
  byId: klassesById,
  allIds: allKlasses
})

export default klassReducer

function klassesById(state = {}, action) {

  switch(action.type) {
    case 'START_ADDING_KLASSES_REQUEST':
      return {
        ...state
      }

    case 'ADD_KLASSES':
      const normalizedObject = {}
      action.klasses.forEach(klass => {
        normalizedObject[`klass${klass.id}`] = klass
      })

      return {
        ...normalizedObject
      }

    default:
      return state;
  }
}

function allKlasses(state = [], action) {

  switch(action.type) {
    case 'ADD_KLASSES':
      return [
        ...action.klasses.map(klass => `klass${klass.id}`)
      ]

    default:
      return state;
  }
}
