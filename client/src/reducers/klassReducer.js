import { combineReducers } from 'redux'

const klassReducer = combineReducers({
  byId: klassesById,
  allIds: allKlasses
})

export default klassReducer

function klassesById(state = {}, action) {

  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return {}

    case 'START_ADDING_KLASSES_REQUEST':
      return {
        ...state
      }

    case 'ADD_KLASSES':
      const normalizedObject = {}
      action.klasses.forEach(klass => {
        normalizedObject[`klass${klass.id}`] = klass
      })

      action.counts.forEach(element => {
        normalizedObject[`klass${element.id}`].count = element.count
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

    case 'START_EDITING_KLASS_REQUEST':
        return {
          ...state
        }

    case 'EDIT_KLASS':
      const { klass } = action
      return {
        ...state,
        [`klass${klass.id}`]: klass
      }

    case 'START_REMOVING_KLASS_REQUEST':
      return {
        ...state
      }

    case 'REMOVE_KLASS':
      const deleteKlassId = `klass${action.klassId}`
      const { [deleteKlassId]: value, ...withoutKlass } = state
      return { ...withoutKlass }

    default:
      return state;
  }
}

function allKlasses(state = [], action) {

  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return []

    case 'ADD_KLASSES':
      return [
        ...action.klasses.map(klass => `klass${klass.id}`)
      ]

    case 'ADD_KLASS':
      const klassId = `klass${action.klass.id}`
      return [...state, klassId]

    case 'REMOVE_KLASS':
      const deleteKlassId = `klass${action.klassId}`
      return state.filter(klId => klId !== deleteKlassId)

    default:
      return state;
  }
}
