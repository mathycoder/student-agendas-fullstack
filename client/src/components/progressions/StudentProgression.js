import React from 'react'

const StudentProgression = (props) => {
  const { progression, videos, handleDragStart } = props
  if (progression){
    return (
      <div
        className={`student-show-progression ${progression.color}`}
        draggable onDragStart={event => handleDragStart(event, progression)}
        >
        <div className={`student-show-progression-title ${progression.color}-title`}>{progression.name}</div>
        <div className="student-show-progression-items">
          {progression.videos.map((videoId, index) => {
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
              return (<div></div>)
            }
            }
          )}
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default StudentProgression
