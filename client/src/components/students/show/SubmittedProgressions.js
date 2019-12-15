import React from 'react'
import StudentProgression from '../StudentProgression'

const SubmittedProgressions = ({progressions, reflections, videos}) => {
    console.log(progressions)
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
            Submitted on {prog.updatedAt} <br/>
            Reflection Response: {prog.question1Answer}
          </div>
        </div>
      ))}
    </>
  )
}

export default SubmittedProgressions
