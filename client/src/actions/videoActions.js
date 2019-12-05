export function fetchVideos() {
  return (dispatch) => {
    dispatch({type: 'START_ADDING_VIDEOS_REQUEST'})
    fetch(`/videos`, {
      method: "GET",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(videos => {
        if (videos.error){
          console.log("Can't load videos")
        } else {
          dispatch({ type: 'ADD_VIDEOS', videos })
        }
    })
  }
}
