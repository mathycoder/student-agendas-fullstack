function currentUserReducer(state = null, action) {

  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...action.user.user,
        type: action.user.type
      }

    case 'SET_CURRENT_USER_TO_NONE':
      return 'none'

    case 'CLEAR_CURRENT_USER':
      return 'none'

    default:
      return state;
  }
}

export default currentUserReducer
