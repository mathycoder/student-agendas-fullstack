import React from 'react'

const IndexProgression = ({progression, deleteProgression}) => {
  return (
    <div className="index-progression">
      <h3>{progression.name}</h3>
      <div className="index-progression-x-out" onClick={(event) => deleteProgression(progression)}>x</div>
      <div className="index-progression-items">
        {progression.videos.map((video, index) => (
          <div key={index} className="index-progression-item">
            <img src={video.thumbnailUrl} alt="learning video" />
            <br/>
            <div className="index-progression-item-title">{video.title}</div>
          </div>
          )
        )}
      </div>
    </div>
  )
}

export default IndexProgression
