import React, { Component } from 'react'

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
    return (
      <div>
        <form onSubmit={event => this.props.handleStudentSubmit(event, this.state)}>
          <input type="text"
            placeholder="First Name"
            onChange={this.handleFirstNameChange}
            value={this.state.firstName} />
          <input type="text"
            placeholder="Last Name"
            onChange={this.handleLastNameChange}
            value={this.state.lastName} />
          <input type="submit" placeholder="Add to class" />
        </form>
      </div>
    )
  }
}

export default CreateStudentForm
