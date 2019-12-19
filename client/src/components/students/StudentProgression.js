import React from 'react'
import RenderItem from '../progressions/RenderItem.js'
import '../helpers/tooltip-styling.css'

const StudentProgression = (props) => {
  const { progression, handleDragStart, handlePlusClick } = props
  if (progression){
    return (
      <div className="progression-container-box">
        <div onClick={e => handlePlusClick(e, progression)}>
          <div className="tooltip-wrapper">
            <span className="tooltiptext">Add to all Agendas</span>
            <button>+</button>
          </div>
        </div>
        <div
          className={`student-show-progression ${progression.color}`}
          draggable={handleDragStart ? 'true' : 'false'} onDragStart={event => handleDragStart(event, progression)}
          >
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

export default StudentProgression
