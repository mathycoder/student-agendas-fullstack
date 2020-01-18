import React from 'react';
import './VideoSearch.css';
import { Droppable, Draggable } from 'react-beautiful-dnd'

const DisplaySearchResults = ({ videos, handleDragStart, handleVideoClick }) => {
  return (
    <div className="search-videos">
      {videos.slice(0,24).map((video, index) => {
        const videoId = video.videoId
        return (
          <Droppable droppableId={`droppable-${index+10}`} isDropDisabled={true} direction="horizontal">
            {(provided) => (
              <div
                ref={node => provided.innerRef(node)}
                {...provided.droppableProps}
                >
                <Draggable draggableId={videoId} index={index} key={videoId}>
                  {(provided2, snapshot) => {
                    return (
                      <>
                        <div
                          {...provided2.dragHandleProps}
                          {...provided2.draggableProps}
                          >
                          <div
                            ref={node => provided2.innerRef(node)}
                            className="search-video"
                            key={index}
                            onClick={(event) => handleVideoClick(index)}>
                            <img alt="searched video result" src={video.thumbnailUrl} />
                            <div className="title-text">{video.title}</div>
                            <div className="creator-text">by {video.channelTitle}</div>
                            <div className="created-date">{video.date}</div>
                          </div>
                        </div>
                        {snapshot.isDragging && (
                            <div
                              className="search-video"
                              key={index}
                              onClick={(event) => handleVideoClick(index)}>
                              <img alt="searched video result" src={video.thumbnailUrl} />
                              <div className="title-text">{video.title}</div>
                              <div className="creator-text">by {video.channelTitle}</div>
                              <div className="created-date">{video.date}</div>
                            </div>
                    		)}
                      </>
                  )}}
                </Draggable>
              </div>
            )}
          </Droppable>
        )
      })}
    </div>
  )
}

// <Droppable droppableId="droppable-2" isDropDisabled={true} direction="horizontal">
//   {(provided) => (
//     <DisplaySearchResults
//       handleDragStart={handleDragStart}
//       handleVideoClick={this.handleVideoClick}
//       innerRef={provided.innerRef}
//       {...provided.droppableProps}
//       videos={videoSearch || []}/>
//   )}
// </Droppable>

export default DisplaySearchResults
