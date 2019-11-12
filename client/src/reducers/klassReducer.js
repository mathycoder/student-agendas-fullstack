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

    case 'START_ADDING_KLASS_REQUEST':
      return {
        ...state
      }

    case 'ADD_KLASS':
      const klassId = `klass${action.klass.id}`
      return {
        ...state,
        [klassId]: action.klass
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

    case 'ADD_KLASS':
      const klassId = `klass${action.klass.id}`
      return [...state, klassId]

    default:
      return state;
  }
}
