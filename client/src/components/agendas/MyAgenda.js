import React  from 'react'
import RenderItem from '../progressions/RenderItem'

const MyAgenda = ({ progressions, handleProgressionClick, itemIndex, selectedProgressionId }) => {
  return (
    <div className="myagenda index-page">
      {progressions.map((progression, index) => {
        if (progression && !progression.submitted) {
          return (
            <div key={index} className="progression-wrapper">
              <div className={`student-show-progression ${progression.color}`}>
                <div className={`student-show-progression-title ${progression.color}-title`}>
                  {progression.name}
                </div>
                <div className="student-show-progression-items">
                  <RenderItem
                    handleProgressionClick={handleProgressionClick}
                    itemIndex={itemIndex}
                    selectedProgressionId={selectedProgressionId}
                    progression={progression} />
                </div>
              </div>
              <div className="progression-status">
                <span className="dot"></span>
                {`Assigned: ${progression.createdAt}`}
              </div>
            </div>
          )
        } else if (progression && progression.submitted) {
            return (
              <div key={index} className="progression-wrapper">
                <div
                className={`student-show-progression ${progression.color} submitted`}>
                  <div className={`student-show-progression-title ${progression.color}-title`}>
                    {progression.name}
                  </div>
                  <div className="student-show-progression-items">
                    <RenderItem
                      itemIndex={itemIndex}
                      selectedProgressionId={selectedProgressionId}
                      progression={progression} />
                  </div>
                </div>
                <div className="progression-status">
                  <span className="dot green"></span>
                    {`Submitted: ${progression.submittedAt}`}
                </div>
              </div>
            )
        } else {
          return (<div key={index}></div>)
        }
      })}
      <div className="empty-agenda">{ progressions.length === 0 ? 'This Agenda is empty.' : ''}</div>
    </div>
  )
}

export default MyAgenda
