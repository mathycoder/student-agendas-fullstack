import React, { Component } from 'react'
import './student.css'

class CreateStudentForm extends Component {

  state = {
    firstName: "",
    lastName: ""
  }

  handleFirstNameChange = (event) => {
    this.setState({
      ...this.state,
      firstName: event.target.value
    })
  }

  handleLastNameChange = (event) => {
    this.setState({
      ...this.state,
      lastName: event.target.value
    })
  }


  render() {
    const { handleStudentSubmit } = this.props
    const { firstName, lastName } = this.state
    return (
      <div className="new-student-form">
        <form onSubmit={event => handleStudentSubmit(event, this.state)}>
          <input type="text"
            placeholder="First Name"
            onChange={this.handleFirstNameChange}
            value={firstName} />
          <input type="text"
            placeholder="Last Name"
            onChange={this.handleLastNameChange}
            value={lastName} />
          <input type="submit" placeholder="Add to class" />
        </form>
      </div>
    )
  }
}

export default CreateStudentForm
