import React, { Component } from 'react'

class StudentContainer extends Component {

  displayStudents = () => (
    this.props.students.map(student => (
      <h2>{student.firstName} {student.lastName}</h2>
    ))
  )

  render(){
    return (
      <div>
        {this.props.students ? this.displayStudents() : ''}
      </div>
    )
  }
}

export default StudentContainer
