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
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '../students/student.css'

class ShowKlassContainer extends Component {
  handleDragOver = event => {
    event.preventDefault()
    const agenda = event.currentTarget.closest('.student-agenda')
    agenda.style.backgroundColor = "rgb(211, 211, 211)"
  }

  handleDragLeave = event => {
    event.preventDefault()
    const agenda = event.currentTarget.closest('.student-agenda')
    agenda.style.backgroundColor = "rgb(81, 84, 92)"
  }

  handleDragStart = (event, progression) => {
    let data = JSON.stringify(progression)
    event.dataTransfer.setData("progression", data)
  }

  handleDragDrop = (event) => {
    const { studentProgressions, students, addStudentProgression, addFlashMessage } = this.props
    const agenda = event.currentTarget.closest('.student-agenda')
    agenda.style.backgroundColor = "rgb(81, 84, 92)"
    let progression = event.dataTransfer.getData("progression")
    progression = JSON.parse(progression)
    const student = students.byId[`student${event.currentTarget.dataset.studentId}`]
    const any = studentProgressions.allIds.filter(spId => {
      const sp = studentProgressions.byId[spId]
      return sp.studentId === `student${student.id}` && sp.progressionId === `progression${progression.id}`
    })
    if (any.length === 0){
      addStudentProgression(student, progression)
    } else {
      addFlashMessage("This student agenda already has this progression")
    }
  }

  handleDNDDragStart = attributes => {
    // const {draggableId} = attributes
    // if (!attributes.draggableId.startsWith("query")) {
    //   document.querySelector(`#item-${draggableId}`).classList.add("item-dragging")
    // }
  }

  handleDNDDragEnd = result => {
    const { switchStudentProgression, progressions, students, studentProgressions, addStudentProgression, addFlashMessage } = this.props
    const { destination, source, draggableId } = result

    if (!destination || !source) { return }

    if (source.index !== destination.index && source.droppableId === destination.droppableId && destination.index !== source.index) {
      // handles shifting progressions around within a progression
      debugger
      const student = students.byId[draggableId.split("-")[0]]
      const progression = progressions.byId[draggableId.split("-")[1]]
      switchStudentProgression(student, progression, destination.index)
    } else if (source.droppableId.includes("progression") && destination.droppableId.includes("student")){
        // handles moving a progression from index to a student agenda
        const index = destination.index
        const student = students.byId[destination.droppableId.split("-")[1]]
        const progression = progressions.byId[source.droppableId.split("-")[1]]
        const any = studentProgressions.allIds.filter(spId => {
          const sp = studentProgressions.byId[spId]
          return sp.studentId === `student${student.id}` && sp.progressionId === `progression${progression.id}`
        })
        if (any.length === 0){
          addStudentProgression(student, progression, index)
        } else {
          addFlashMessage("This student agenda already has this progression")
        }
    } else if (source.droppableId !== destination.droppableId && source.droppableId.includes("student") && destination.droppableId.includes("student")) {
      // handles shifting progressions around within agendas

      // IDENTICAL CODE: so, one of the agendas will go through the process of adding a new progression
      debugger
      const index = destination.index
      const student = students.byId[destination.droppableId.split("-")[1]]
      const progression = progressions.byId[source.droppableId.split("-")[1]]
      const any = studentProgressions.allIds.filter(spId => {
        const sp = studentProgressions.byId[spId]
        return sp.studentId === `student${student.id}` && sp.progressionId === `progression${progression.id}`
      })
      if (any.length === 0){
        addStudentProgression(student, progression, index)
      } else {
        addFlashMessage("This student agenda already has this progression")
      }
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
    switchStudentProgression: (student, progression, newIndex) => dispatch(switchStudentProgression(student, progression, newIndex))
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
