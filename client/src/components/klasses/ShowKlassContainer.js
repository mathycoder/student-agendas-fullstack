import React, { Component } from 'react'
import StudentsContainer from '../students/StudentsContainer'
import IndexProgressionsContainer from '../progressions/IndexProgressionsContainer'
import EditStudents from '../students/EditStudents'
import { connect } from 'react-redux'
import { addStudents } from '../../actions/studentActions'
import { addStudentProgression } from '../../actions/studentProgressionActions'
import { addFlashMessage } from '../../actions/flashActions'
import { deleteStudentProgression, switchStudentProgression } from '../../actions/studentProgressionActions'
import ShowKlassAllProgressions from './ShowKlassAllProgressions'
import { DragDropContext } from 'react-beautiful-dnd';
import '../students/student.css'

class ShowKlassContainer extends Component {
  handleDNDDragEnd = result => {
    const { switchStudentProgression, progressions, students } = this.props
    const { destination, source, draggableId } = result

    if (!destination || !source) { return }


    if (source.index !== destination.index && source.droppableId === destination.droppableId && destination.index !== source.index) {
      // handles shifting progressions around within an agenda
      const student = students.byId[draggableId.split("-")[0]]
      const progression = progressions.byId[draggableId.split("-")[1]]
      const mySubmittedSps = this.submittedSps(student)
      switchStudentProgression(student, progression, destination.index + mySubmittedSps.length)
    } else if (source.droppableId.includes("progression") && destination.droppableId.includes("student")){
        // handles moving a progression from index to a student agenda
        this.addProgressionToAgenda(result)
    } else if (source.droppableId !== destination.droppableId && source.droppableId.includes("student") && destination.droppableId.includes("student")) {
        // handles moving a progression from one agenda to another
        if (this.addProgressionToAgenda(result)) {
          this.deleteProgressionFromAgenda(result)
        }
    }
  }

  deleteProgressionFromAgenda = (result) => {
    const { deleteStudentProgression, studentProgressions } = this.props
    const { draggableId } = result

    const studentId = draggableId.split("-")[0]
    const progressionId = draggableId.split("-")[1]
    const studentProgId = studentProgressions.allIds.find(spId => {
      const sp = studentProgressions.byId[spId]
      return sp.studentId === studentId && sp.progressionId === progressionId
    })
    const studentProg = studentProgressions.byId[studentProgId]
    deleteStudentProgression(studentProg)
  }

  submittedSps = (student) => {
    const { studentProgressions } = this.props
    return studentProgressions.allIds.filter(spId => {
      const sp = studentProgressions.byId[spId]
      return sp.studentId === `student${student.id}` && sp.submitted && !sp.archived
    })
  }

  addProgressionToAgenda = (result) => {
    const { progressions, students, studentProgressions, addStudentProgression, addFlashMessage } = this.props
    const { destination, source, draggableId } = result

    const student = students.byId[destination.droppableId.split("-")[1]]
    const mySubmittedSps = this.submittedSps(student)
    const index = destination.index + mySubmittedSps.length
    const progression = draggableId.includes("student") ? progressions.byId[draggableId.split("-")[1]] : progressions.byId[source.droppableId.split("-")[1]]
    const any = studentProgressions.allIds.filter(spId => {
      const sp = studentProgressions.byId[spId]
      return sp.studentId === `student${student.id}` && sp.progressionId === `progression${progression.id}`
    })
    if (any.length === 0){
      addStudentProgression(student, progression, index)
      return true
    } else {
      addFlashMessage("This student agenda already has this progression")
      return false
    }
  }

  renderStudents = () => <StudentsContainer
                          klass={this.props.klass}
                          handleDragOver={this.handleDragOver}
                          handleDragLeave={this.handleDragLeave}
                          handleDragDrop={this.handleDragDrop}
                          showProgressions={this.props.showProgressions} />


  renderProgressions = () => <IndexProgressionsContainer klass={this.props.klass} handleDragStart={this.handleDragStart}/>

  render(){
    const { klass, editingStudents, showProgressions, submitted } = this.props
    if (klass) {
      return (
        <DragDropContext
          onDragEnd={this.handleDNDDragEnd}
          onDragStart={this.handleDNDDragStart}
          >
          <div className="klass-show-container">
            { editingStudents ? <EditStudents klass={klass} />
              : ( submitted ? <ShowKlassAllProgressions /> : this.renderStudents()) }
            { !editingStudents && !submitted && showProgressions ? this.renderProgressions() : <div></div> }
          </div>
        </DragDropContext>
      )
    } else {
      return <div></div>
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStudents: (klassId) => dispatch(addStudents(klassId)),
    addStudentProgression: (student, progression, index) => dispatch(addStudentProgression(student, progression, index)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message)),
    switchStudentProgression: (student, progression, newIndex) => dispatch(switchStudentProgression(student, progression, newIndex)),
    deleteStudentProgression: (studentProgression) => dispatch(deleteStudentProgression(studentProgression))
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    students: state.students,
    studentProgressions: state.studentProgressions,
    progressions: state.progressions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassContainer)
