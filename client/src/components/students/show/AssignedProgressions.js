import React from 'react'
import StudentProgression from '../StudentProgression'

const AssignedProgressions = ({progressions, reflections, videos}) => {
  return (
    <>
      {progressions.map((prog, index) => (
        <div key={index} className="progression-wrapper">
          <div className="student-progression">
            <StudentProgression
              progression={prog}
              reflections={reflections}
              videos={videos}/>
          </div>
          <div className="student-progression-details">
            Assigned on {prog.createdAt}
          </div>
        </div>

      ))}
    </>
  )
}

export default AssignedProgressions
