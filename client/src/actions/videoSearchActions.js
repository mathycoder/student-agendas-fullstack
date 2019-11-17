export function vimeoVideoSearch(query) {
  return (dispatch) => {
    dispatch({type: 'START_VIMEO_SEARCH_REQUEST', query})
    fetch(`/videos/getVimeoVideoMetadata/?q=${query}`)
      .then(resp => resp.json())
      .then(videos => dispatch({ type: 'ADD_VIMEO_VIDEOS', videos }))
  }
}

export function youTubeVideoSearch(query) {
  return (dispatch) => {
    dispatch({type: 'START_YOUTUBE_SEARCH_REQUEST', query})
    fetch(`/videos/getYouTubeVideoMetadata/?q=${query}`)
      .then(resp => resp.json())
      .then(videos => dispatch({ type: 'ADD_YOUTUBE_VIDEOS', videos }))
  }
}
