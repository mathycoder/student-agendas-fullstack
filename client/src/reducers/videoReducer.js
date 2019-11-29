import { combineReducers } from 'redux'

const videoReducer = combineReducers({
  byId: videosById,
  allIds: allVideos
})

export default videoReducer

function videosById(state = {}, action) {
  switch(action.type) {

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
      action.progression.items.forEach(video => {
        normalizedObj[`video${video.id}`] = video
      })

      return {
        ...state,
        ...normalizedObj
      }

    case 'EDIT_PROGRESSION':
      const allVideos = {...state}
      for (const vid in allVideos) {
        if (allVideos[vid].progression_id === action.progression.id){
          delete allVideos[vid]
        }
      }
      action.progression.videos.forEach(video => {
        allVideos[`video${video.id}`] = video
      })

      return {
        ...state,
        ...allVideos
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

    case 'ADD_PROGRESSION':

      return [
        ...state, ...action.progression.items.map(video => `video${video.id}`)
      ]

    case 'EDIT_PROGRESSION':

      return [
        ...state, ...action.progression.items.map(video => `video${video.id}`)
      ]

    default:
      return state
  }
}
