import React, { Component } from 'react'
import StudentProgression from '../StudentProgression'
import '../css/student-summary.css'

class StudentShowSummary extends Component {
  renderProgressionRow = (progression, index) => {
    return (
      <div key={index} className="progression-row">
        <StudentProgression progression={progression}/>
        <div className="summary-dates">
          <div>Assigned: <br/><strong>{progression.createdAt}</strong> </div>
          <div>
            Completed: <br/> <div className={`${progression.submittedAt === 'incomplete' ? 'incomplete' : ''}`}><strong>{progression.submittedAt}</strong></div>
          </div>
        </div>
        <div className="summary-reflection">
          {this.renderReflection(progression).question1}
        </div>
        <div className="summary-reflection-answer">
          {progression.question1Answer}
        </div>
        <div className={`summary-reflection-comment ${progression.question1Comment ? 'post-it' : ''}`}>
          <div>{progression.question1Comment}</div>
        </div>
      </div>
    )
  }

  sortedProgs = (progressions) => {
    return progressions.sort((a,b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB - dateA
    })
  }

  renderReflection = (progression) => {
    const { reflections } = this.props
    const reflectionIndex = progression.items.findIndex(item => item.includes("reflection"))
    const reflectionId = progression.items[reflectionIndex]
    return reflections.byId[reflectionId]
  }

  render(){
    const { student, progressions, currentUser } = this.props
    return (
      <div className="student-summary-page">
        <div className="header">
          <div>Progression</div>
          <div>Date</div>
          <div>Reflection</div>
          <div>{student.firstName}'s Answer</div>
          <div>{currentUser.name}'s Comment</div>
        </div>
        {this.sortedProgs(progressions).map((progression, index) => {
          return this.renderProgressionRow(progression, index)
        })}
      </div>
    )
  }
}

export default StudentShowSummary
