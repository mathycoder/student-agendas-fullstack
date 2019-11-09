import React from 'react'

function sortedVideos(videos){
  return videos.sort((a,b) => {
    return a.progression_index - b.progression_index
  })
}

const IndexProgression = (props) => {
  return (
    <div className="index-progression">
      <h3>{props.progression.name}</h3>
      <div className="index-progression-x-out" onClick={(event) => props.deleteProgression(props.progression)}>x</div>
      <div className="index-progression-items" onClick={(event) => {props.history.push(`/progressions/${props.progression.id}`)}}>
        {sortedVideos(props.progression.videos).map((video, index) => (
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