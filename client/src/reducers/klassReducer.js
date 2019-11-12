export default function klassReducer(
  state = {klasses: [], requesting: false}, action) {

  switch(action.type) {
    case 'START_ADDING_KLASSES_REQUEST':
      return {
        ...state,
        klasses: [...state.klasses],
        requesting: true
      }

    case 'ADD_KLASSES':
      return {
        ...state,
        klasses: action.klasses,
        requesting: false
      }

      default:
        return state;
  }
}
