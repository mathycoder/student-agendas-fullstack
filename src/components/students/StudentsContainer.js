import React, { Component } from 'react'
import Student from './Student'
import './student.css'
import { connect } from 'react-redux'
import { getActiveStudentProgressions } from '../progressions/helpers/getStudentProgressions'

class StudentContainer extends Component {
  displayStudents = () => {
    const { students, klass, handleDragOver, handleDragLeave, handleDragDrop, progressions, studentProgressions } = this.props
    return students.allIds.map((stId, index) => {
      const student = students.byId[stId]
      return (
        <Student
          key={index}
          student={student}
          klass={klass}
          progressions={getActiveStudentProgressions(student, studentProgressions, progressions)}
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
