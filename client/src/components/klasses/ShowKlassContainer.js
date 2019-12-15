import React, { Component } from 'react'
import StudentsContainer from '../students/StudentsContainer'
import IndexProgressionsContainer from '../progressions/IndexProgressionsContainer'
import EditStudents from '../students/EditStudents'
import { connect } from 'react-redux'
import { addStudents } from '../../actions/studentActions'
import { addStudentProgression } from '../../actions/studentProgressionActions'
import { addFlashMessage } from '../../actions/flashActions'
import '../students/student.css'

class ShowKlassContainer extends Component {
  state = {
    editingStudents: false,
    showProgressions: true
  }

  handleEditingStudents = () => {
    this.setState({...this.state, editingStudents: !this.state.editingStudents})
  }

  handleShowProgressions = () => {
    this.setState({
      ...this.state,
      showProgressions: !this.state.showProgressions
    })
  }

  handleDragOver = event => {
    event.preventDefault()
    const agenda = event.currentTarget.closest('.student-agenda')
    agenda.style.backgroundColor = "#FFFF00"
  }

  handleDragLeave = event => {
    event.preventDefault()
    const agenda = event.currentTarget.closest('.student-agenda')
    agenda.style.backgroundColor = "rgb(240, 240, 240)"
  }

  handleDragStart = (event, progression) => {
    let data = JSON.stringify(progression)
    event.dataTransfer.setData("progression", data)
  }

  handleDragDrop = (event) => {
    const { studentProgressions, students, addStudentProgression, addFlashMessage } = this.props
    const agenda = event.currentTarget.closest('.student-agenda')
    agenda.style.backgroundColor = "rgb(240, 240, 240)"
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
                          showProgressions={this.state.showProgressions} />


  renderProgressions = () => <IndexProgressionsContainer handleDragStart={this.handleDragStart}/>


  progressionsButton = () =>  <button onClick={this.handleShowProgressions}>
                                {this.state.showProgressions ? 'Hide Progressions' : 'Show Progressions'}
                              </button>


  render(){
    const { klass } = this.props
    const { editingStudents, showProgressions } = this.state
    if (klass) {
      return (
        <div className="klass-show-container">
          <div className="klass-show-title">
            <h1>{klass.name}</h1>
            <button onClick={this.handleEditingStudents}>
              { editingStudents ? 'Return to Class': 'Edit Students' }
            </button>
            { editingStudents ? '' : this.progressionsButton()}
          </div>
          { editingStudents ? <EditStudents klass={klass} /> : this.renderStudents() }
          { !editingStudents && showProgressions ? this.renderProgressions() : <div></div> }

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
