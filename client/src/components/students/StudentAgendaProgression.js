import React from 'react'

const StudentAgendaProgression = (props) => {
  const { progression, videos, reflections, handleDeleteProgClick, innerRef } = props
  if (progression){
    return (
      <div className={`student-show-progression ${progression.color}`} ref={node => innerRef(node)}>
        <div className={`student-show-progression-title ${progression.color}-title`}>
          <div onClick={event => handleDeleteProgClick(progression)} className="student-prog-x">x</div>
          {progression.name}
        </div>
        <div className="student-show-progression-items">
          {progression.items.map((itemChildId, index) => {
            if (itemChildId.includes("video")) {
              if (videos.allIds.length > 0){
                const video = videos.byId[itemChildId]
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
            } else if (itemChildId.includes("reflection")) {
              if (reflections.allIds.length > 0){
                const reflection = reflections.byId[itemChildId]
                return (
                <div key={index} className="student-show-progression-item reflection">
                  <img src="/paper-pencil.png" alt="learning reflection" />
                  <br/>
                  <div className="student-show-progression-item-title">{reflection.title}</div>
                </div>
               )
              } else {
                return (<div key={index}></div>)
              }
            }
          })}
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default StudentAgendaProgression
