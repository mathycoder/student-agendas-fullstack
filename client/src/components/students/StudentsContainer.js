import React, { Component } from 'react'
import Student from './Student'
import './student.css'
import { DragDropContext } from 'react-beautiful-dnd';

class StudentContainer extends Component {

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

  handleDNDDragStart = attributes => {
    // const {draggableId} = attributes
    // document.querySelector(`#item-${draggableId}`).classList.add("item-dragging")
  }

  handleDNDDragEnd = result => {
    // TODO: update the order of progressions in the student agenda

    // const { destination, source, draggableId } = result
    // document.querySelector(`#item-${draggableId}`).classList.remove("item-dragging")
    // if (!destination) {
    //   return
    // }
    //
    // if (destination.index !== source.index) {
    //   const testArray = [...this.state.currProgression]
    //   testArray.splice(source.index, 1)
    //   testArray.splice(destination.index, 0, this.state.currProgression[source.index])
    //   this.setState({
    //     ...this.state,
    //     currProgression: testArray
    //   })
    // }

  }

  render(){
    return (
      <DragDropContext
        onDragEnd={this.handleDNDDragEnd}
        onDragStart={this.handleDNDDragStart}
        >
        <div className="student-agendas">
          {this.props.students ? this.displayStudents() : ''}
        </div>
      </DragDropContext>
    )
  }
}

export default StudentContainer
