import React from 'react'

const ProgressionDisplay = ({progression}) => {
  console.log(progression)
  return (
    <div className="progression-display">
      <h3>{progression.name}</h3>
      <div className="progression">
        {progression.videos.map((video, index) => {
          return (
            <div key={index} className="progression-item-container">
              <div className="x-out">x</div>
              <div className="progression-item" id={`item-${video.videoId}`}>
                <img width="180px" src={video.thumbnailUrl} alt="learning video" />
                <br/>
                <div className="progression-item-title">{video.title}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressionDisplay
