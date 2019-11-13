import React, { Component } from 'react'

class StudentContainer extends Component {

  displayStudents = () => {
    const { students, removeStudentFromKlass } = this.props
    return students.allIds.map((stId, index) => {
      const student = students.byId[stId]
      return (
        <div key={index} className="student-agenda">
          <h2>{student.firstName} {student.lastName}</h2>
          <button onClick={event => removeStudentFromKlass(student)}>Delete Student</button>
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
