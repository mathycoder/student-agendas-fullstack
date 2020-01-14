import React from 'react'
import RenderItem from './RenderItem.js'

const IndexProgression = (props) => {
  const { progression } = props
  if (progression){
    return (
      <div className="student-progression-index-wrapper">
        <div className={`student-show-progression ${progression.color}`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>{progression.name}</div>
          <div className="index-progression-x-out" onClick={(event) => props.handleDeleteProgression(progression)}>x</div>
          <div className="student-show-progression-items" onClick={(event) => {props.history.push(`/progressions/${progression.id}`)}}>
            <RenderItem progression={progression} />
          </div>
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default IndexProgression
