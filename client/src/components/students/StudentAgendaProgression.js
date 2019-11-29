import React from 'react'

const StudentAgendaProgression = (props) => {
  const { progression, videos, handleDeleteProgClick, innerRef } = props
  if (progression){
    return (
      <div className={`student-show-progression ${progression.color}`} ref={node => innerRef(node)}>
        <div className={`student-show-progression-title ${progression.color}-title`}>
          <div onClick={event => handleDeleteProgClick(progression)} className="student-prog-x">x</div>
          {progression.name}
        </div>
        <div className="student-show-progression-items">
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
    )
  } else {
    return (<div></div>)
  }

}

export default StudentAgendaProgression
