import { combineReducers } from 'redux'

const videoReducer = combineReducers({
  byId: videosById,
  allIds: allVideos
})

export default videoReducer

function videosById(state = {}, action) {
  switch(action.type) {

    case 'START_ADDING_VIDEOS_REQUEST':
      console.log('START_ADDING_VIDEOS_REQUEST')
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

    default:
      return state
  }
}


function allVideos(state = [], action) {

  switch(action.type) {

    case 'ADD_VIDEOS':
      return [
        ...action.videos.map(video => `video${video.id}`)
      ]

    default:
      return state
  }
}
