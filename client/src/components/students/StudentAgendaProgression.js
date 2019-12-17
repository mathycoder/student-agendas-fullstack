import React from 'react'
import RenderItem from '../progressions/RenderItem.js'

const StudentAgendaProgression = (props) => {
  const { progression, handleDeleteProgClick, innerRef } = props
  if (progression && !progression.submitted){
    return (
      <div className="student-show-progression-container">
        <div className={`student-show-progression ${progression.color}`} ref={node => innerRef(node)}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            <div onClick={event => handleDeleteProgClick(progression)} className="student-prog-x">x</div>
            {progression.name}
          </div>
          <div className="student-show-progression-items">
            <RenderItem progression={progression} />
          </div>
        </div>
        <div className="color-bar-wrapper">
          <div className="color-bar"></div>
        </div>
      </div>
    )
  } else if (progression && progression.submitted) {
    return (
      <div className="student-show-progression-container">
        <div className={`student-show-progression ${progression.color}`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            {progression.name}
          </div>
          <div className="student-show-progression-items">
            <RenderItem progression={progression} />
          </div>
        </div>
        <div className="color-bar-wrapper">
          <div className={`color-bar ${progression.graded ? 'green' : 'yellow'}`}></div>
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default StudentAgendaProgression
