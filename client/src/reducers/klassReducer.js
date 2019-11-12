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

    case 'START_ADDING_KLASS_REQUEST':
      return {
        ...state,
        klasses: [...state.klasses],
        requesting: true
      }

    case 'ADD_KLASS':
      return {
        ...state,
        klasses: state.klasses.concat(action.klass),
        requesting: false
      }

    case 'START_REMOVING_KLASS_REQUEST':
      return {
        ...state,
        klasses: [...state.klasses],
        requesting: true
      }

    case 'REMOVE_KLASS':
      return {
        ...state,
        klasses: state.klasses.filter(kl => kl.id !== action.klassId),
        requesting: false
      }

    case 'START_ADDING_STUDENT_TO_KLASS_REQUEST':
      return {
        ...state,
        klasses: [...state.klasses],
        requesting: true
      }

    case 'ADD_STUDENT_TO_KLASS':
      return {
        ...state,
        klasses: state.klasses.map(klass => {
          if (klass.id === action.student.klass_id) {
            const klassCopy = {...klass}
            klassCopy.students.push(action.student)
            return klassCopy
          }
          return klass
        }),
        requesting: true
      }

    default:
      return state;
  }
}
