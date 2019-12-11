import React from 'react'

const MyProgressionVideo = ({video}) => {
  return (
    <div className="myprogression-video">
      <div className="video-display">
        <iframe
          title="video preview"
          id="video" type="text/html"
          width="420" height="260"
          src={video.url}
          frameBorder="0"
          allowFullScreen
          ></iframe>
      </div>
      <div className="video-details">
        <h4>{video.title}</h4>
        <h6>Created by {video.channelTitle} on {video.date}</h6>
        <p>{video.description}</p>
      </div>
    </div>
  )
}

export default MyProgressionVideo
