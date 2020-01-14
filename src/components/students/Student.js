import React, { Component } from 'react'
import StudentAgenda from './StudentAgenda'
import './student.css'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import { deleteStudentProgression, switchStudentProgression } from '../../actions/studentProgressionActions'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'

class Student extends Component {
  handleDeleteProgClick = (progression) => {
    const { deleteStudentProgression, student } = this.props
    deleteStudentProgression(student, progression)
  }

  handleDNDDragEnd = result => {
    const { destination, source, draggableId } = result
    if (!destination || !source) { return }

    if (destination.index !== source.index) {
      this.props.switchStudentProgression(draggableId, destination.index)
    }
  }

  renderStudentAgenda = () => {
    const { student, progressions, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return (
      <DragDropContext
        onDragEnd={this.handleDNDDragEnd}
        onDragStart={this.handleDNDDragStart}
        >
        <Droppable droppableId={`droppable-${student.id}`} direction="horizontal">
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
      </DragDropContext>
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
    switchStudentProgression: (draggableId, newIndex) => dispatch(switchStudentProgression(draggableId, newIndex))
  }
}

export default connect(null, mapDispatchToProps)(Student)
