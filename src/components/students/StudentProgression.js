import React from 'react'
import RenderItem from '../progressions/RenderItem.js'

const StudentProgression = (props) => {
  const { progression, handleDragStart, handlePlusClick } = props
  if (progression){
    return (
      <div className="progression-container-box">
        {handlePlusClick ?
          <div onClick={e => handlePlusClick(e, progression)}>
            <button>+</button>
          </div>
          : ''
        }
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
