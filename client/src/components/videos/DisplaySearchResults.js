import React from 'react';
import './VideoSearch.css';
import { Droppable, Draggable } from 'react-beautiful-dnd'

const DisplaySearchResults = ({ videos, handleVideoClick }) => {
  return (
    <div className="search-videos">
      {videos.slice(0,24).map((video, index) => {
        const videoId = video.videoId
        return (
          <Droppable droppableId={`droppable-${index+10}`} isDropDisabled={true} direction="horizontal">
            {(provided) => (
              <div ref={node => provided.innerRef(node)} {...provided.droppableProps}>
                <div className="search-video" key={index} onClick={(event) => handleVideoClick(index)}>
                  <Draggable draggableId={`query-${videoId}`} index={index} key={`query-${videoId}`}>
                    {(provided2, snapshot) => {
                      return (
                        <>
                          <div {...provided2.dragHandleProps} {...provided2.draggableProps}>
                              <img ref={node => provided2.innerRef(node)} alt="searched video result" src={video.thumbnailUrl} />
                          </div>
                          {snapshot.isDragging && (
                            <img alt="searched video result" src={video.thumbnailUrl} />
                          )}
                        </>
                      )}}
                  </Draggable>
                  <div className="title-text">{video.title}</div>
                  <div className="creator-text">by {video.channelTitle}</div>
                  <div className="created-date">{video.date}</div>
                </div>
              </div>
            )}
          </Droppable>
        )
      })}
    </div>
  )
}

export default DisplaySearchResults
