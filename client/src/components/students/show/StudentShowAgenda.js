import React  from 'react'
import RenderItem from '../../progressions/RenderItem'

const StudentShowAgenda = ({ progressions, handleProgressionClick, itemIndex, selectedProgressionId }) => {
  return (
    <div className="myagenda index-page">
      {progressions.map((progression, index) => {
        if (progression) {
          return (
            <div key={index} className="progression-wrapper">
              <div className={`student-show-progression ${progression.color} ${progression.submitted ? 'submitted' : ''}`}>
                <div className={`student-show-progression-title ${progression.color}-title`}>
                  {progression.name}
                </div>
                <div className="student-show-progression-items">
                  <RenderItem
                    handleProgressionClick={handleProgressionClick}
                    itemIndex={itemIndex}
                    selectedProgressionId={selectedProgressionId}
                    studentShowSettings={true}
                    progression={progression} />
                </div>
              </div>
              <div className="progression-status">
                {progression.submitted ? `Submitted: ${progression.updatedAt}` : `Assigned: ${progression.createdAt}`}
              </div>
            </div>
          )
        } else {
          return (<div key={index}></div>)
        }
      })}
    </div>
  )
}

export default StudentShowAgenda
