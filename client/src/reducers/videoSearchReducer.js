function videoSearchReducer(state = [], action) {
  switch(action.type) {

    case 'START_ADDING_VIDEOS_REQUEST':
      return [
        ...state
      ]

    case 'ADD_VIMEO_VIDEOS':
      debugger
      return [
        ...createVideoObjects(action.videos.data)
      ]

    default:
      return state
  }
}

export default videoSearchReducer

function formatDate(publishedAt){
  const date = new Date(publishedAt)
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const month = MONTHS[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

function createVideoObjects(videos){
  return videos.map(video => {
    return {
      title: video.name,
      videoId: video.uri.split('/')[2],
      channelTitle: video.user.name,
      description: video.description,
      date: formatDate(video.created_time),
      thumbnailUrl: video.pictures.sizes[1].link,
      url: video.embed.html.match(/https[^\s"]+/)[0]
    }
  })
}
