import React from 'react';
import './VideoSearch.css';

const DisplaySearchResults = ({ videos, handleDragStart, handleVideoClick }) => {
  return (
    <div className="search-videos">
      {videos.slice(0,24).map((video, index) => {
        return (
          <div draggable
            onDragStart={event => handleDragStart(event, video)}
            className="search-video"
            key={index}
            onClick={(event) => handleVideoClick(index)}>
            <img alt="searched video result" src={video.thumbnailUrl} />
            <div className="title-text">{video.title}</div>
            <div className="creator-text">by {video.channelTitle}</div>
            <div className="created-date">{video.date}</div>
          </div>
        )
      })}
    </div>
  )
}

export default DisplaySearchResults
