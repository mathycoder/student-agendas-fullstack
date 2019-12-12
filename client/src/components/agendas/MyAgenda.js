import React  from 'react'
import RenderItem from '../progressions/RenderItem'

const MyAgenda = ({ progressions, handleProgressionClick, itemIndex, selectedProgressionId }) => {
//onClick={e => handleProgressionClick(progression)}
  return (
    <div className="myagenda index-page">
      {progressions.map((progression, index) => {
        if (progression) {
          return (
            <div

            key={index}
            className={`student-show-progression ${progression.color}`}>
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
          )
        } else {
          return (<div key={index}></div>)
        }
      })}
    </div>
  )
}

export default MyAgenda
