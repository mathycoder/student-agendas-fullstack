import React from 'react'
import RenderItem from '../../progressions/RenderItem'

const StudentShowAgenda = ({progressions}) => {
  return progressions.map((progression, index) => {
    if (progression && !progression.submitted){
      return (
        <div className={`student-show-progression ${progression.color}`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            <div className="student-prog-x">x</div>
            {progression.name}
          </div>
          <div className="student-show-progression-items">
            <RenderItem progression={progression} />
          </div>
        </div>
      )
    } else if (progression && progression.submitted) {
      return (
        <div className={`student-show-progression ${progression.color} submitted`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            {progression.name}
          </div>
          <div className="student-show-progression-items">
            <RenderItem progression={progression} />
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  })
}

export default StudentShowAgenda
