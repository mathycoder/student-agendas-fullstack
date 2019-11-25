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
      <div className="edit-table-student-row student-form">
        <div></div>
        <div>
          <input type="text"
            placeholder="First Name"
            onChange={this.handleFirstNameChange}
            value={firstName} />
        </div>
        <div>
          <input type="text"
            placeholder="Last Name"
            onChange={this.handleLastNameChange}
            value={lastName} />
        </div>
        <div>
          <button onClick={event => handleStudentSubmit(event, this.state)}>Add to Class</button>
        </div>
        <div>
          <button onClick={this.props.handleAddStudent}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default CreateStudentForm
