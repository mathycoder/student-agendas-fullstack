import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudentProgressionStatus } from '../../../actions/studentProgressionActions'

class StudentShowReflection extends Component {
  state = {
    comment: '',
    editing: false
  }

  handleTextChange = e => {
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { student, progression, updateStudentProgressionStatus } = this.props
    updateStudentProgressionStatus(student, progression, {comment: this.state.comment})
  }

  handleEditClick = e => {
    const { progression } = this.props
    this.setState({
      ...this.state,
      editing: true,
      comment: progression.question1Comment
    })
  }

  renderForm = () => {
    return (
      <div className="teacher-comment">
        <textarea
          required
          onChange={this.handleTextChange}
          value={this.state.comment}
          placeholder="Enter feedback here">
        </textarea>
        <div className="submit-progression">
          <input
            type="submit"
            value="Submit Feedback" />
        </div>
      </div>
    )
  }

  renderCurrentComment = () => {
    const { progression } = this.props
    return (
      <div>
        <div className="teacher-comment not-editing">
          <h3>Teacher feedback: </h3>
          <p>{progression.question1Comment}</p>
          <div className="submit-progression">
            <button onClick={this.handleEditClick}>Edit</button>
          </div>
        </div>
      </div>

    )
  }

  render(){
    const { reflection, student, progression } = this.props
    const { editing } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
      <div className="myprogression-reflection">
          <div className="lined-paper">
            <div className="myprogression-reflection-title">
              {reflection.title}
            </div>
            <div className="myprogression-reflection-question">
              {reflection.question1}
            </div>
          </div>
          <div className="reflection-response">
            <h3>{student.firstName}'s Response:</h3>
            <p>{progression.submitted ? progression.question1Answer : 'Not Yet Completed'}</p>
          </div>
          {!progression.submitted ? '' : (editing ? this.renderForm() : this.renderCurrentComment())}

      </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateStudentProgressionStatus: (student, progression, status) => dispatch(updateStudentProgressionStatus(student, progression, status))
  }
}

export default connect(null, mapDispatchToProps)(StudentShowReflection)
