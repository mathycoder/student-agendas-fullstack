import React, { Component } from 'react'
import Student from './Student'
import './student.css'

class StudentContainer extends Component {

  sortedStudentIds = (students) => {
    return students.allIds.sort((idA, idB) => {
      const studentA = students.byId[idA].firstName.toLowerCase()
      const studentB = students.byId[idB].firstName.toLowerCase()
      if (studentA > studentB) { return 1 }
      else if (studentA < studentB ) {return -1 }
      else {return 0}
    })
  }

  getStudentProgressions = (student) => {
    const { studentProgressions, progressions } = this.props
    const myProgressionIds = studentProgressions.allIds.filter(spId => {
      const studentProgression = studentProgressions.byId[spId]
      return studentProgression.studentId === `student${student.id}`
    })
    const myProgressions = myProgressionIds.map(stPrId => {
      const studentProg = studentProgressions.byId[stPrId]
      return progressions.byId[studentProg.progressionId]
    })
    return myProgressions
  }

  displayStudents = () => {
    const { students, videos, removeStudentFromKlass, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return this.sortedStudentIds(students).map((stId, index) => {
      const student = students.byId[stId]
      return (
        <Student
          key={index}
          student={student}
          progressions={this.getStudentProgressions(student)}
          videos={videos}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDragDrop={handleDragDrop}
          removeStudentFromKlass={removeStudentFromKlass}/>
    )})
  }

  render(){
    return (
      <div className="student-agendas">
        {this.props.students ? this.displayStudents() : ''}
      </div>
    )
  }
}

export default StudentContainer
