import React, { Component } from 'react'
import Student from './Student'
import './student.css'
import { connect } from 'react-redux'

class StudentContainer extends Component {
  getStudentProgressions = (student) => {
    const { studentProgressions, progressions } = this.props
    if (progressions.allIds.length > 0){
      const myStudentProgressionIds = studentProgressions.allIds.filter(spId => {
        const studentProgression = studentProgressions.byId[spId]
        return studentProgression.studentId === `student${student.id}`
      })
      const myStudentProgressions = myStudentProgressionIds.map(stPrId => {
        return studentProgressions.byId[stPrId]
      })
      const myOrderedStudentProgressions = myStudentProgressions.sort((a,b) => a.agendaIndex - b.agendaIndex)
      const myProgressions = myOrderedStudentProgressions.map(sp => {
        const prog = {...progressions.byId[sp.progressionId]}
        prog.submitted = sp.submitted
        prog.createdAt = this.formatDate(sp.createdAt)
        prog.updatedAt = this.formatDate(sp.updatedAt)
        prog.question1Answer = sp.question1Answer
        return prog
      })
      return myProgressions
    } else {
      return []
    }
  }

  formatDate = (rawDate) => {
    const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"]
    const date = new Date(rawDate)
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  displayStudents = () => {
    const { students, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return students.allIds.map((stId, index) => {
      const student = students.byId[stId]
      return (
        <Student
          key={index}
          student={student}
          progressions={this.getStudentProgressions(student)}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDragDrop={handleDragDrop} />
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

function mapStateToProps(state){
  return {
    students: state.students,
    studentProgressions: state.studentProgressions,
    progressions: state.progressions
  }
}

export default connect(mapStateToProps, null)(StudentContainer)
