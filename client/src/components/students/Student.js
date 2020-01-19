import React, { Component } from 'react'
import StudentAgenda from './StudentAgenda'
import './student.css'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import { deleteStudentProgression } from '../../actions/studentProgressionActions'
import { Droppable } from 'react-beautiful-dnd'

class Student extends Component {
  handleDeleteProgClick = (progression) => {
    const { deleteStudentProgression, student } = this.props
    deleteStudentProgression(student, progression)
  }

  renderStudentAgenda = () => {
    const { student, progressions, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return (

        <Droppable droppableId={`droppable-student${student.id}`} direction="horizontal">
          {(provided) => (
            <StudentAgenda
              {...provided.droppableProps}
              placeholder={provided.placeholder}
              innerRef={provided.innerRef}
              student={student}
              progressions={progressions}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDragDrop={handleDragDrop}
              handleDeleteProgClick={this.handleDeleteProgClick}
              />
          )}
        </Droppable>

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

function mapDispatchToProps(dispatch){
  return {
    deleteStudentProgression: (student, progression) => dispatch(deleteStudentProgression(student, progression)),
  }
}

export default connect(null, mapDispatchToProps)(Student)
