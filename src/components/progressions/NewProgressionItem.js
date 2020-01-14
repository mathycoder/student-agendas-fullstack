import React from 'react'

const NewProgressionItem = ({video, reflection, removeFromProgression, handleProgressionItemClick, index, innerRef}) => {
  if (video) {
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
  } else if (reflection) {
    return (
      <div ref={node => innerRef(node)} className="progression-item-container">
        <div className="x-out" onClick={(event) => removeFromProgression(reflection)}>x</div>
        <div className="progression-item reflection-item" id={`item-${reflection.tempId || `reflection${reflection.id}`}`} onClick={event => handleProgressionItemClick(index)}>
          <img width="180px" src="/paper-pencil.png" alt="learning reflection" />
            <br/>
            <div className="reflection-item-title">{reflection.title}</div>
        </div>
      </div>
    )
  }

}

export default NewProgressionItem
