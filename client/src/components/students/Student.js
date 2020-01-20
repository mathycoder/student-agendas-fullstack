import React, { Component } from 'react'
import StudentAgenda from './StudentAgenda'
import './student.css'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import { deleteStudentProgression } from '../../actions/studentProgressionActions'

class Student extends Component {
  handleDeleteProgClick = (progression) => {
    const { deleteStudentProgression, student, studentProgressions } = this.props
    const studentId = `student${student.id}`
    const progressionId = `progression${progression.id}`
    const studentProgId = studentProgressions.allIds.find(spId => {
      const sp = studentProgressions.byId[spId]
      return sp.studentId === studentId && sp.progressionId === progressionId
    })
    const studentProg = studentProgressions.byId[studentProgId]
    deleteStudentProgression(studentProg)
  }

  renderStudentAgenda = () => {
    const { student, progressions } = this.props
    return (
      <StudentAgenda
        student={student}
        progressions={progressions}
        handleDeleteProgClick={this.handleDeleteProgClick}
        />
    )
  }

  render(){
    const { student, klass } = this.props
    return (
      <div className={`student-row`}>
        <div className="student-name">
          <NavLink to={`/classes/${klass.id}/students/${student.id}`}>
            <h2>{student.firstName} {student.lastName}</h2>
          </NavLink>

        </div>
        {this.renderStudentAgenda()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    studentProgressions: state.studentProgressions
  }
}

function mapDispatchToProps(dispatch){
  return {
    deleteStudentProgression: (student, progression) => dispatch(deleteStudentProgression(student, progression)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)
