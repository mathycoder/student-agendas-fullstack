import React, { Component } from 'react'
import './student.css'

class Student extends Component {
  render(){
    const { student, removeStudentFromKlass, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return (
      <div className={`student-row`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        data-student-id={student.id}
        >
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
