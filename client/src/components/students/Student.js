import React, { Component } from 'react'
import './student.css'

class Student extends Component {
  render(){
    const { student, removeStudentFromKlass } = this.props
    return (
      <div className="student-row">
        <div className="student-name">
          <div className="index-progression-x-out" onClick={(event) => removeStudentFromKlass(student)}>x</div>
          <h2>{student.firstName} {student.lastName}</h2>
        </div>
        <div className="student-agenda">
        </div>
      </div>
    )
  }
}




export default Student
