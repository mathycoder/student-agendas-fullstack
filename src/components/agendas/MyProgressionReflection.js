import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudentProgression } from '../../actions/studentProgressionActions'

class MyProgressionReflection extends Component {
  state = {
    response: '',
    editing: true
  }

  componentDidMount(){
    const { progression } = this.props
    const edit = progression.question1Answer ? false : true
    this.setState({
      ...this.state,
      response: progression.question1Answer,
      editing: edit
    })
  }

  handleTextChange = e => {
    this.setState({
      ...this.state,
      response: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { progression, currentUser, updateStudentProgression } = this.props
    updateStudentProgression(currentUser, progression, this.state)
    this.setState({
      ...this.state,
      editing: false
    })
  }

  handleEditClick = e => {
    this.setState({
      ...this.state,
      editing: true
    })
  }

  renderForm = () => {
    return (
      <div className="reflection-response">
        <textarea
          required
          onChange={this.handleTextChange}
          value={this.state.response}
          placeholder="Enter your response here">
        </textarea>
        <div className="submit-progression">
          <input
            type="submit"
            value="Save Response" />
        </div>
      </div>
    )
  }

  renderCurrentResponse = () => {
    const { progression } = this.props
    return (
      <div className="reflection-response">
        <h3>Your current response: </h3>
        <p>{progression.question1Answer}</p>
        <div className="submit-progression">
          <button onClick={this.handleEditClick}>Edit</button>
        </div>
      </div>
    )
  }

  render(){
    const {reflection} = this.props
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
          {this.state.editing ? this.renderForm() : this.renderCurrentResponse()}

      </div>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateStudentProgression: (student, progression, attribute) => dispatch(updateStudentProgression(student, progression, attribute))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProgressionReflection)
