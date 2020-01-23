function loadingReducer(state=null, action){
  switch(action.type){

    case 'START_ADDING_PROGRESSIONS_REQUEST':
      return true

    case 'ADD_PROGRESSIONS':
      return false


    default:
      return state
  }
}

export default loadingReducer
