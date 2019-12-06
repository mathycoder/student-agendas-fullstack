function flashReducer(state=[], action){
  switch(action.type){
    case 'CLEAR_CURRENT_USER':
      return "Successfully logged out"

    case 'FLASH_DELETE':
      return null

    default:
      return null
  }
}

export default flashReducer
