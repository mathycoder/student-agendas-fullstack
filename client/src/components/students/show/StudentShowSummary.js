import React, { Component } from 'react'
import StudentProgression from '../StudentProgression'
import '../css/student-summary.css'

class StudentShowSummary extends Component {
  renderProgressionRow = (progression, index) => {
    return (
      <div key={index} className="progression-row">
        <StudentProgression progression={progression}/>
        <div className="summary-dates">
          <div>Assigned: <br/>{progression.createdAt} </div>
          <div>
            Completed: <br/> <div className={`${progression.submittedAt === 'incomplete' ? 'incomplete' : ''}`}>{progression.submittedAt}</div>
          </div>
        </div>
        <div className="summary-reflection">
          {this.renderReflection(progression).question1}
        </div>
        <div className="summary-reflection-answer">
          {progression.question1Answer}
        </div>
        <div className="summary-reflection-comment">
          {progression.question1Comment}
        </div>
      </div>
    )
  }

  renderReflection = (progression) => {
    const { reflections } = this.props
    const reflectionIndex = progression.items.findIndex(item => item.includes("reflection"))
    const reflectionId = progression.items[reflectionIndex]
    return reflections.byId[reflectionId]
  }

  render(){
    const { student, progressions } = this.props
    return (
      <div className="student-summary-page">
        <div className="header">
          <div>Progression</div>
          <div>Date</div>
          <div>Reflection</div>
          <div>{student.firstName}'s Answer</div>
          <div>Comment</div>
        </div>
        {progressions.map((progression, index) => {
          return this.renderProgressionRow(progression, index)
        })}
      </div>
    )
  }
}

export default StudentShowSummary
