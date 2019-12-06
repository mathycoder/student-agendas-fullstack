import { combineReducers } from 'redux'

const videoReducer = combineReducers({
  byId: videosById,
  allIds: allVideos
})

export default videoReducer

function videosById(state = {}, action) {
  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return {}

    case 'START_ADDING_VIDEOS_REQUEST':
      return {
        ...state
      }

    case 'ADD_VIDEOS':
      const normalizedObject = {}
      action.videos.forEach(video => {
        normalizedObject[`video${video.id}`] = video
      })
      return {
        ...normalizedObject
      }

    case 'ADD_PROGRESSION':
      const normalizedObj = {}
      action.progression.items.forEach(item => {
        if (item.video) {
          normalizedObj[`video${item.video.id}`] = item.video
        }
      })

      return {
        ...state,
        ...normalizedObj
      }

    case 'EDIT_PROGRESSION':
      const normObj = {}
      action.progression.items.forEach(item => {
        if (item.video) {
          normObj[`video${item.video.id}`] = item.video
        }
      })

      return {
        ...state,
        ...normObj
      }

    default:
      return state
  }
}


function allVideos(state = [], action) {

  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return []

    case 'ADD_VIDEOS':
      return [
        ...action.videos.map(video => `video${video.id}`)
      ]

    case 'ADD_PROGRESSION':
      const newItemsWithVideos = action.progression.items.filter(item => item.video)

      return [
        ...state, ...newItemsWithVideos.map(item => `video${item.video.id}`)
      ]

    case 'EDIT_PROGRESSION':
      const editedItemsWithVideos = action.progression.items.filter(item => item.video)

      return [
        ...state, ...editedItemsWithVideos.map(item => `video${item.video.id}`)
      ]

    // case 'EDIT_PROGRESSION':
    //
    //   return [
    //     ...state, ...action.progression.items.map(video => `video${video.id}`)
    //   ]

    default:
      return state
  }
}
