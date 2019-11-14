import React from 'react'

const IndexProgression = (props) => {
  const { progression, videos } = props
  return (
    <div className="index-progression">
      <h3>{progression.name}</h3>
      <div className="index-progression-x-out" onClick={(event) => props.deleteProgression(progression)}>x</div>
      <div className="index-progression-items" onClick={(event) => {props.history.push(`/progressions/${progression.id}`)}}>
        {progression.videos.map((videoId, index) => {
          if (videos.allIds.length > 0){
            const video = videos.byId[videoId]
            return (
            <div key={index} className="index-progression-item">
              <img src={video.thumbnailUrl} alt="learning video" />
              <br/>
              <div className="index-progression-item-title">{video.title}</div>
            </div>
           )
          } else {
            return (<div></div>)
          }
          }
        )}
      </div>
    </div>
  )
}

export default IndexProgression
