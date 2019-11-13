import React, { Component } from 'react'

class StudentContainer extends Component {

  displayStudents = () => {
    return this.props.students.allIds.map((stId, index) => {
      const student = this.props.students.byId[stId]
      return (
        <div key={index} className="student-agenda">
          <h2>{student.firstName} {student.lastName}</h2>
          <button onClick={event => this.props.removeStudentFromKlass(student)}>Delete Student</button>
        </div>
    )})
  }

  render(){
    return (
      <div>
        {this.props.students ? this.displayStudents() : ''}
      </div>
    )
  }
}

export default StudentContainer
