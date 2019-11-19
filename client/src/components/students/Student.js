import React, { Component } from 'react'
import StudentProgression from '../progressions/StudentProgression'
import './student.css'

class Student extends Component {
  render(){
    const { student, progressions, videos, removeStudentFromKlass, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return (
      <div className={`student-row`}>
        <div className="student-name">
          <div className="index-progression-x-out" onClick={(event) => removeStudentFromKlass(student)}>x</div>
          <h2>{student.firstName} {student.lastName}</h2>
        </div>
        <div
          className="student-agenda"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
          data-student-id={student.id}
          >
          {progressions.map((progression, index) => <StudentProgression key={index} videos={videos} progression={progression}/>)}
        </div>
      </div>
    )
  }
}




export default Student
