import { combineReducers } from 'redux'

const youTubeReducer = combineReducers({
  videos: youTubeVideos,
  static: youTubeStatic
})

const vimeoReducer = combineReducers({
  videos: vimeoVideos,
  static: vimeoStatic
})

const videoSearchReducer = combineReducers({
  youTube: youTubeReducer,
  vimeo: vimeoReducer
})

export default videoSearchReducer

function youTubeVideos(state = [], action) {
  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return []

    case 'START_YOUTUBE_SEARCH_REQUEST':
      return []

    case 'ADD_YOUTUBE_VIDEOS':
      return [
        ...createYouTubeVideoObjects(action.videos.items)
      ]

    default:
      return state
  }
}

function youTubeStatic(state = {searchTerm: null, loading: false}, action) {
  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return []

    case 'START_YOUTUBE_SEARCH_REQUEST':
      return {
        ...state,
        searchTerm: action.query,
        loading: true
      }

    case 'ADD_YOUTUBE_VIDEOS':
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

function vimeoVideos(state = [], action) {
  switch(action.type) {
    case 'CLEAR_CURRENT_USER':
      return []

    case 'START_VIMEO_SEARCH_REQUEST':
      return []

    case 'ADD_VIMEO_VIDEOS':
      return [
        ...createVimeoVideoObjects(action.videos.data)
      ]

    default:
      return state
  }
}

function vimeoStatic(state = {searchTerm: null, loading: false}, action) {
  switch(action.type) {

    case 'START_VIMEO_SEARCH_REQUEST':
      return {
        ...state,
        searchTerm: action.query,
        loading: true
      }

      case 'ADD_VIMEO_VIDEOS':
        return {
          ...state,
          loading: false
        }

    default:
      return state
  }
}



function formatTitle(unformattedTitle){
  const parser = new DOMParser()
  let title = parser.parseFromString('<!doctype html><body>' + unformattedTitle, 'text/html')
  return title.body.textContent
}

function formatDate(publishedAt){
  const date = new Date(publishedAt)
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const month = MONTHS[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

function createVimeoVideoObjects(videos){
  const myVideos = videos.map(video => {
    if (video.privacy.embed !== "private") {
      return {
        title: video.name,
        videoId: video.uri.split('/')[2],
        channelTitle: video.user.name,
        description: video.description,
        date: formatDate(video.created_time),
        thumbnailUrl: video.pictures.sizes[1].link,
        url: video.embed.html.match(/https[^\s"]+/)[0]
      }
    } else {
      return null
    }
  })
  return myVideos.filter(video => video !== null)
}

function createYouTubeVideoObjects(videos){
  return videos.map(video => {
    const url = 'http://www.youtube.com/embed/' + video.id.videoId
    return {
      title: formatTitle(video.snippet.title),
      videoId: video.id.videoId,
      channelTitle: video.snippet.channelTitle,
      description: video.snippet.description,
      date: formatDate(video.snippet.publishedAt),
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      url: url
    }
  })
}
