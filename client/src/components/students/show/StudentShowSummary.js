import React, { Component } from 'react'
import StudentProgression from '../StudentProgression'
import PostItForm from './PostItForm'
import { connect } from 'react-redux'
import { updateStudentProgressionStatus } from '../../../actions/studentProgressionActions'
import DisplayColors from '../../helpers/DisplayColors'
import '../css/student-summary.css'

class StudentShowSummary extends Component {
  state = {
    progression: null,
    studentProgressionId: null,
    editing: false
  }

  handleEditClick = (e, progression) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      editing: true,
      studentProgressionId: progression.studentProgressionId,
      progression: progression
    })
  }

  handleEditSubmit = (e, attributes) => {
    const { progression } = this.state
    const { students, updateStudentProgressionStatus} = this.props
    const student = students.byId[progression.studentId]
    updateStudentProgressionStatus(student, progression, attributes)
    this.setState({
      ...this.state,
      editing: false,
      studentProgressionId: undefined
    })
  }

  renderProgressionRow = (progression, index) => {
    const { myAgenda, students } = this.props
    const { editing, studentProgressionId } = this.state
    const student = students.byId[progression.studentId]
    if (student){
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
            <p><span className="answer-title"><strong>{student.firstName} {student.lastName}</strong>'s Response: </span>{progression.question1Answer ? `"${progression.question1Answer}"` : <span className="incomplete">incomplete</span>}</p>
          </div>
          <div className={`summary-reflection-comment ${editing && progression.studentProgressionId === studentProgressionId ? '' : 'post-it'}`}>
            {editing && progression.studentProgressionId === studentProgressionId ?
              <PostItForm
                comment={progression.question1Comment}
                handleEditSubmit={this.handleEditSubmit}/>
              : <p>{progression.question1Comment}{!editing && progression.submitted && !myAgenda ? <button className="edit-comment-button" onClick={e => this.handleEditClick(e, progression)}>{progression.question1Comment ? 'Edit' : 'Add Feedback'}</button> : ''}</p>}
          </div>
        </div>
      )
    } else {
      return <div key={index}></div>
    }
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
    const { student, progressions, myAgenda } = this.props
    return (
      <div className="student-summary-wrapper">
        <div className="title-heading">
          <h2>{myAgenda || student ? 'All Progressions' : 'To Be Graded'}</h2>
          <DisplayColors />
        </div>
        <div className="student-summary-page">
          {this.sortedProgs(progressions).map((progression, index) => {
            return this.renderProgressionRow(progression, index)
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    students: state.students
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateStudentProgressionStatus: (student, progression, status) => dispatch(updateStudentProgressionStatus(student, progression, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentShowSummary)
