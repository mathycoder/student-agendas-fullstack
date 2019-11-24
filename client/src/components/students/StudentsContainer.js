import React, { Component } from 'react'
import Student from './Student'
import './student.css'

class StudentContainer extends Component {

  getStudentProgressions = (student) => {
    const { studentProgressions, progressions } = this.props
    const myStudentProgressionIds = studentProgressions.allIds.filter(spId => {
      const studentProgression = studentProgressions.byId[spId]
      return studentProgression.studentId === `student${student.id}`
    })
    const myStudentProgressions = myStudentProgressionIds.map(stPrId => {
      return studentProgressions.byId[stPrId]
    })
    const myOrderedStudentProgressions = myStudentProgressions.sort((a,b) => a.agendaIndex - b.agendaIndex)
    const myProgressions = myOrderedStudentProgressions.map(sp => progressions.byId[sp.progressionId])

    return myProgressions
  }

  displayStudents = () => {
    const { students, videos, removeStudentFromKlass, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return students.allIds.map((stId, index) => {
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
      <div className={`student-agendas ${this.props.showProgressions ? '' :'slide-width'}`}>
        {this.props.students ? this.displayStudents() : ''}
      </div>
    )
  }
}

export default StudentContainer
