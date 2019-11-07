import React from 'react'

const IndexProgression = ({progression}) => {
  console.log(progression)
  return (
    <div className="index-progression">
      <h3>{progression.name}</h3>
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
