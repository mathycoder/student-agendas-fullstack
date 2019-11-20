import React, { Component } from 'react'
import StudentAgenda from './StudentAgenda'
import './student.css'
import { connect } from 'react-redux'
import { deleteStudentProgression } from '../../actions/studentProgressionActions'
import { Droppable } from 'react-beautiful-dnd'

class Student extends Component {

  handleDeleteProgClick = (progression) => {
    const { deleteStudentProgression, student } = this.props
    deleteStudentProgression(student, progression)
  }

  render(){
    const { student, progressions, videos, removeStudentFromKlass, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return (
      <div className={`student-row`}>
        <div className="student-name">
          <div className="index-progression-x-out" onClick={(event) => removeStudentFromKlass(student)}>x</div>
          <h2>{student.firstName} {student.lastName}</h2>
        </div>
        <Droppable droppableId={`droppable-${student.id}`} direction="horizontal">
          {(provided) => (
            <StudentAgenda
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              student={student}
              progressions={progressions}
              videos={videos}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDragDrop={handleDragDrop}
              handleDeleteProgClick={this.handleDeleteProgClick}
              />
          )}
        </Droppable>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    deleteStudentProgression: (student, progression) => dispatch(deleteStudentProgression(student, progression))
  }
}

export default connect(null, mapDispatchToProps)(Student)
