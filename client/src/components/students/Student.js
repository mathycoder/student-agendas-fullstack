import React, { Component } from 'react'
import StudentAgenda from './StudentAgenda'
import './student.css'
import { connect } from 'react-redux'
import { deleteStudentProgression, switchStudentProgression } from '../../actions/studentProgressionActions'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'

class Student extends Component {

  handleDeleteProgClick = (progression) => {
    const { deleteStudentProgression, student } = this.props
    deleteStudentProgression(student, progression)
  }

  handleDNDDragStart = attributes => {
    // const {draggableId} = attributes
    // document.querySelector(`#item-${draggableId}`).classList.add("item-dragging")
  }

  handleDNDDragEnd = result => {
    const { destination, source, draggableId } = result
    if (!destination || !source) { return }

    if (destination.index !== source.index) {
      this.props.switchStudentProgression(draggableId, destination.index)
    }
  }

  render(){
    const { student, progressions, videos, reflections, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return (
      <div className={`student-row`}>
        <div className="student-name">
          <h2>{student.firstName} {student.lastName}</h2>
        </div>
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
                videos={videos}
                reflections={reflections}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDragDrop={handleDragDrop}
                handleDeleteProgClick={this.handleDeleteProgClick}
                />
            )}
          </Droppable>
        </DragDropContext>
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
