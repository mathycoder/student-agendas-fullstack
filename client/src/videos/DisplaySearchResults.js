import React from 'react';
import './VideoSearch.css';

const DisplaySearchResults = (props) => {
  return (
    <div className="search-videos">
      {props.videos.slice(0,24).map((video, index) => {
        return (
          <div draggable onDragStart={event => props.handleDragStart(event, video)} className="search-video" key={index} onClick={(event) => props.handleVideoClick(index)}>
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
