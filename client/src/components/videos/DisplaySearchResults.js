import React from 'react';
import './VideoSearch.css';
import { Draggable } from 'react-beautiful-dnd'

const DisplaySearchResults = ({ videos, handleDragStart, handleVideoClick, innerRef }) => {
  return (
    <div className="search-videos" ref={node => innerRef(node)}>
      {videos.slice(0,24).map((video, index) => {
        const videoId = video.videoId
        return (
          <Draggable draggableId={videoId} index={index} key={videoId}>
            {(provided) => {
              return (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  >
                  <div
                    ref={node => provided.innerRef(node)}
                    className="search-video"
                    key={index}
                    onClick={(event) => handleVideoClick(index)}>
                    <img alt="searched video result" src={video.thumbnailUrl} />
                    <div className="title-text">{video.title}</div>
                    <div className="creator-text">by {video.channelTitle}</div>
                    <div className="created-date">{video.date}</div>
                  </div>
                </div>
            )}}
          </Draggable>
        )
      })}
    </div>
  )
}

export default DisplaySearchResults
