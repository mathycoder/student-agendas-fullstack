import React, { Component } from 'react'
import StudentsContainer from '../students/StudentsContainer'
import IndexProgressionsContainer from '../progressions/IndexProgressionsContainer'
import EditStudents from '../students/EditStudents'
import { connect } from 'react-redux'
import { addStudents } from '../../actions/studentActions'
import { addStudentProgression } from '../../actions/studentProgressionActions'
import { addFlashMessage } from '../../actions/flashActions'
import ShowKlassAllProgressions from './ShowKlassAllProgressions'
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
        <div className="klass-show-container">
          { editingStudents ? <EditStudents klass={klass} />
            : ( submitted ? <ShowKlassAllProgressions /> : this.renderStudents()) }
          { !editingStudents && !submitted && showProgressions ? this.renderProgressions() : <div></div> }
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStudents: (klassId) => dispatch(addStudents(klassId)),
    addStudentProgression: (student, progression) => dispatch(addStudentProgression(student, progression)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    students: state.students,
    studentProgressions: state.studentProgressions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassContainer)
