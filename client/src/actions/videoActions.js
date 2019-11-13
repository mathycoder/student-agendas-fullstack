export function fetchVideos() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_VIDEOS_REQUEST'})
    fetch(`/videos`)
      .then(resp => resp.json())
      .then(videos => dispatch({ type: 'ADD_VIDEOS', videos }))
  }
}
