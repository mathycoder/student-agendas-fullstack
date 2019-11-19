import React, { Component } from 'react'
import './student.css'

class Student extends Component {
  render(){
    const { student, progressions, removeStudentFromKlass, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    if (progressions.length > 0) {console.log(progressions)}
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
          {progressions.map(progression => (<h2>{progression.id}</h2>))}
        </div>
      </div>
    )
  }
}




export default Student
