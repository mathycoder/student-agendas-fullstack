import React from 'react'
import RenderItem from '../progressions/RenderItem.js'

const StudentProgressionUndraggable = ({ progression, index }) => {
  if (progression){
    return (
      <div className="progression-container-box">
        <div className={`student-show-progression ${progression.color}`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>{progression.name}</div>
          <div className="student-show-progression-items">
            <RenderItem progression={progression} />
          </div>
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default StudentProgressionUndraggable
