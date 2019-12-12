import React  from 'react'
import RenderItem from '../progressions/RenderItem'

const MyAgenda = ({ progressions, handleProgressionClick, itemIndex, selectedProgressionId }) => {

  return (
    <div className="myagenda index-page">
      {progressions.map((progression, index) => {
        if (progression) {
          return (
            <div
            onClick={e => handleProgressionClick(progression)}
            key={index}
            className={`student-show-progression ${progression.color}`}>
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
          )
        } else {
          return (<div key={index}></div>)
        }
      })}
    </div>
  )
}

export default MyAgenda
