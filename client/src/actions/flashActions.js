export function flashDelete(){
  return {type: 'FLASH_DELETE'}
}

export function addFlashMessage(message){
  return {type: 'ADD_FLASH_MESSAGE', message}
}
