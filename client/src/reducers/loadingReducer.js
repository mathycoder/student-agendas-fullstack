function loadingReducer(state= {
  loadingProgressions: null,
  loadingStudents: null
}, action){
  switch(action.type){

    case 'START_ADDING_PROGRESSIONS_REQUEST':
      return {
        ...state, loadingProgressions: true
      }

    case 'ADD_PROGRESSIONS':
      return {
        ...state, loadingProgressions: false
      }

    case 'START_ADDING_STUDENTS_REQUEST':
      return {
        ...state, loadingStudents: true
      }

    case 'ADD_STUDENTS':
      return {
        ...state, loadingStudents: false
      }

    default:
      return state
  }
}

export default loadingReducer
