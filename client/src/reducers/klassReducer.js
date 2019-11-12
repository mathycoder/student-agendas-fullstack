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
      const klassCopy = {...action.klass}
      klassCopy.students = []
      return {
        ...state,
        klasses: state.klasses.concat(klassCopy),
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
        requesting: false
      }

    case 'START_REMOVING_STUDENT_FROM_KLASS_REQUEST':
      return {
        ...state,
        klasses: [...state.klasses],
        requesting: true
      }

    case 'REMOVE_STUDENT_FROM_KLASS':
      const newKlasses = [...state.klasses]
      const klassIndex = newKlasses.findIndex(klass => klass.id === action.student.klass_id)
      const studentIndex = newKlasses[klassIndex].students.findIndex(st => st.id === action.student.id)
      newKlasses[klassIndex].students.splice(studentIndex, 1)

      return {
        ...state,
        klasses: [...newKlasses],
        requesting: false
      }

    default:
      return state;
  }
}
