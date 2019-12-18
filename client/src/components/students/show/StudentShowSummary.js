import React, { Component } from 'react'
import StudentProgression from '../StudentProgression'
import '../css/student-summary.css'

class StudentShowSummary extends Component {
  renderProgressionRow = (progression, index) => {
    const { student } = this.props
    return (
      <div key={index} className="progression-row">
        <div className="summary-progression">
          <StudentProgression progression={progression}/>
          <div className="summary-dates">
            <div className="date-category">Assigned: <br/><strong>{progression.createdAt}</strong> </div>
            <div className="date-category">
              Completed: <br/> <div className={`${progression.submittedAt === 'incomplete' ? 'incomplete' : ''}`}><strong>{progression.submittedAt}</strong></div>
            </div>
          </div>
        </div>
        <div className="summary-reflection">
          <p>{this.renderReflection(progression).question1}</p>
        </div>
        <div className="summary-reflection-answer">
          <p><div className="answer-title">{student.firstName}s Response: </div>{progression.question1Answer ? `"${progression.question1Answer}"` : <span className="incomplete">incomplete</span>}</p>
        </div>
        <div className={`summary-reflection-comment ${progression.question1Comment ? 'post-it' : 'post-it'}`}>
          <p>{progression.question1Comment ? progression.question1Comment : ''}</p>
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


  // <div className="header">
  //   <div>Progression</div>
  //   <div>Reflection</div>
  //   <div>{student.firstName}'s Answer</div>
  //   <div>{currentUser.name}'s Comment</div>
  // </div>

  render(){
    const { student, progressions, currentUser } = this.props
    return (
      <div className="student-summary-page">

        {this.sortedProgs(progressions).map((progression, index) => {
          return this.renderProgressionRow(progression, index)
        })}
      </div>
    )
  }
}

export default StudentShowSummary
