import React from 'react'

const ProgressionItem = ({video, removeFromProgression, handleProgressionItemClick, index, innerRef}) => {
  return (
    <div ref={node => innerRef(node)} className="progression-item-container">
      <div className="x-out" onClick={(event) => removeFromProgression(video)}>x</div>
      <div className="progression-item" id={`item-${video.videoId}`} onClick={event => handleProgressionItemClick(index)}>
        <img width="180px" src={video.thumbnailUrl} alt="learning video" />
        <br/>
        <div className="progression-item-title">{video.title}</div>
      </div>
    </div>
  )
}

export default ProgressionItem
