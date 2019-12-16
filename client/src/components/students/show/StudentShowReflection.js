import React, { Component } from 'react'

class StudentShowReflection extends Component {
  state = {
    comment: ''
  }

  handleTextChange = e => {
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { progression, currentUser, updateStudentProgression } = this.props
  }

  handleEditClick = e => {
    this.setState({
      ...this.state,
      editing: true
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

  render(){
    const { reflection, student, progression } = this.props
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
            <p>{progression.question1Answer}</p>
          </div>
          {this.renderForm()}

      </div>
      </form>
    )
  }
}



export default StudentShowReflection
