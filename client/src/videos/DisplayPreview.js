import React from 'react'
import './VideoSearch.css';

const DisplayPreview = ({video, addToProgression, removeFromProgression}) => {
  return (
    <div className="search-video-preview" >
      <h4>{video.title}</h4><br />
      <h6>
        Created by {video.channelTitle} on {video.date}
      </h6>
      <br/>
      <iframe title="video preview" id="player" type="text/html" width="360" height="220" src={video.url} frameBorder="0"></iframe>
      <p>{video.description}</p>
      {addToProgression ? <button onClick={(event) => addToProgression(video)}>Add to Progression</button> : ''}
      {removeFromProgression ? <button onClick={(event) => removeFromProgression(video)}>Remove from Progression</button> : ''}
    </div>
  )
}

export default DisplayPreview
