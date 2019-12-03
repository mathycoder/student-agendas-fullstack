import React from 'react'
import RenderItem from '../progressions/RenderItem.js'

const StudentProgression = (props) => {
  const { progression, videos, reflections, handleDragStart } = props
  if (progression){
    return (
      <div
        className={`student-show-progression ${progression.color}`}
        draggable onDragStart={event => handleDragStart(event, progression)}
        >
        <div className={`student-show-progression-title ${progression.color}-title`}>{progression.name}</div>
        <div className="student-show-progression-items">
          <RenderItem progression={progression} videos={videos} reflections={reflections} />
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default StudentProgression
