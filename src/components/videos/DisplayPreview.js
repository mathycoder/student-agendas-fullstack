import React from 'react'
import './VideoSearch.css';

const DisplayPreview = ({video, addToProgression, removeFromProgression, shiftup}) => {
  return (
    <div className={shiftup ? "shiftup search-video-preview" : "search-video-preview" } >
      <h4>{video.title}</h4><br />
      <h6>
        Created by {video.channelTitle} on {video.date}
      </h6>
      <br/>
      <div>
      </div>
      <iframe
        title="video preview"
        id="video" type="text/html"
        width="360" height="220"
        src={video.url}
        frameBorder="0"
        allowFullScreen
        >
      </iframe>
      <p>{video.description}</p>
      {addToProgression ? <button onClick={(event) => addToProgression(event, video)}>Add to Progression</button> : ''}
      {removeFromProgression ? <button onClick={(event) => removeFromProgression(video)}>Remove from Progression</button> : ''}
    </div>
  )
}

export default DisplayPreview
