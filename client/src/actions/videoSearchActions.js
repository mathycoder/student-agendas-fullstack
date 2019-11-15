export function vimeoVideoSearch(query) {
  return (dispatch) => {
    dispatch({type: 'START_VIMEO_SEARCH_REQUEST'})
    fetch(`/videos/getVimeoVideoMetadata/?q=${query}`)
      .then(resp => resp.json())
      .then(videos => dispatch({ type: 'ADD_VIMEO_VIDEOS', videos }))
  }
}
