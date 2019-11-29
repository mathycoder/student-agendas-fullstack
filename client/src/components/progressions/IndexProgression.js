import React from 'react'

const IndexProgression = (props) => {
  const { progression, videos } = props
  if (progression){
    return (
      <div className="student-progression-index-wrapper">
        <div className={`student-show-progression ${progression.color}`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>{progression.name}</div>
          <div className="index-progression-x-out" onClick={(event) => props.deleteProgression(progression)}>x</div>
          <div className="student-show-progression-items" onClick={(event) => {props.history.push(`/progressions/${progression.id}`)}}>
            {progression.items.map((videoId, index) => {
              if (videos.allIds.length > 0){
                const video = videos.byId[videoId]
                return (
                <div key={index} className="student-show-progression-item">
                  <img src={video.thumbnailUrl} alt="learning video" />
                  <br/>
                  <div className="student-show-progression-item-title">{video.title}</div>
                </div>
               )
              } else {
                return (<div key={index}></div>)
              }
              }
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default IndexProgression
