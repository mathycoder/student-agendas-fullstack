import React, { Component } from 'react'
import './student.css'

class CreateStudentForm extends Component {

  state = {
    id: undefined,
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  }

  componentDidMount(){
    if (this.props.student){
      const { student } = this.props
      this.setState({
        ...this.state,
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        username: student.username,
        password: student.password
      })
    }
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

  handleUsernameChange = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  renderUsernamePassword = () => {
    const { username, password } = this.state
    return (
      < >
        <div>
          <input type="text"
            placeholder="Username"
            onChange={this.handleUsernameChange}
            value={username} />
        </div>
        <div>
          <input type="text"
            placeholder="Password"
            onChange={this.handlePasswordChange}
            value={password} />
        </div>
      </>
    )
  }


  render() {
    const { handleStudentSubmit } = this.props
    const { firstName, lastName, id } = this.state
    return (
      <div className="edit-table-student-row student-form">
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
        { id ? this.renderUsernamePassword() : ''}
        <div>
          <button onClick={event => handleStudentSubmit(event, this.state)}>
            {id ? 'Submit' : 'Add to Class'}
          </button>
        </div>
        <div>
          <button onClick={this.props.handleCancelStudent}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default CreateStudentForm
