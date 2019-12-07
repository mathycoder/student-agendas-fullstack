function flashReducer(state=[], action){
  switch(action.type){
    case 'ADD_FLASH_MESSAGE':
      return action.message

    case 'FLASH_DELETE':
      return null

    default:
      return null
  }
}

export default flashReducer
