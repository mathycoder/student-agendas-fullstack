import React from 'react'

const IndexProgression = (props) => {
  return (
    <div className="index-progression">
      <h3>{props.progression.name}</h3>
      <div className="index-progression-x-out" onClick={(event) => props.deleteProgression(props.progression)}>x</div>
      <div className="index-progression-items" onClick={(event) => {props.history.push(`/progressions/${props.progression.id}`)}}>
        {props.sortedVideos(props.progression.videos).map((videoId, index) => {
          const video = props.videos.byId[videoId]
          return (
          <div key={index} className="index-progression-item">
            <img src={video.thumbnailUrl} alt="learning video" />
            <br/>
            <div className="index-progression-item-title">{video.title}</div>
          </div>
          )}
        )}
      </div>
    </div>
  )
}

export default IndexProgression
