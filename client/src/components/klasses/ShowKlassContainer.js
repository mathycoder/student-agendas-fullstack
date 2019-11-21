import React, { Component } from 'react'
import CreateStudentForm from '../students/CreateStudentForm'
import StudentsContainer from '../students/StudentsContainer'
import StudentProgressionsContainer from '../progressions/StudentProgressionsContainer'
import { connect } from 'react-redux'
import { removeKlass } from '../../actions/klassActions'
import { fetchProgressions } from '../../actions/progressionActions'
import { fetchVideos } from '../../actions/videoActions'
import { addStudents, addStudentToKlass, removeStudentFromKlass } from '../../actions/studentActions'
import { addStudentProgression } from '../../actions/studentProgressionActions'
import '../students/student.css'

class ShowKlassContainer extends Component {
  state = {
    addingStudent: false
  }

  componentDidMount(){
    const klassId = this.props.match.params.id
    this.props.fetchProgressions()
    this.props.fetchVideos()
    this.props.fetchStudents(klassId)
  }

  handleAddStudent = () => {
    this.setState({...this.state, addingStudent: true})
  }

  handleStudentSubmit = (event, studentData) => {
    event.preventDefault()
    const { match, addStudentToKlass } = this.props
    const klassId = parseInt(match.params.id)
    addStudentToKlass(klassId, studentData)
    this.setState({...this.state, addingStudent: false})
  }

  handleDeleteKlass = (event) => {
    const { match, removeKlass, history } = this.props
    const klassId = parseInt(match.params.id)
    removeKlass(klassId)
    history.push('/classes');
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
    const agenda = event.currentTarget.closest('.student-agenda')
    agenda.style.backgroundColor = "rgb(240, 240, 240)"
    let progression = event.dataTransfer.getData("progression")
    progression = JSON.parse(progression)
    const student = this.props.students.byId[`student${event.currentTarget.dataset.studentId}`]

    const { studentProgressions } = this.props
    const any = studentProgressions.allIds.filter(spId => {
      const sp = studentProgressions.byId[spId]
      return sp.studentId === `student${student.id}` && sp.progressionId === `progression${progression.id}`
    })

    if (any.length === 0){
      this.props.addStudentProgression(student, progression)
    }
  }

  render(){
    const { klasses, students, progressions, videos, match, addStudentToKlass, removeStudentFromKlass, studentProgressions } = this.props
    const klassId = klasses.allIds.find(klassId => klassId === `klass${match.params.id}`) || ""
    const klass = klasses.byId[klassId]
    if (klass) {
      return (
        <div className="klass-show-container">
          <div className="klass-show-title">
            <h1>{klass.name}</h1>
            <button onClick={this.handleDeleteKlass}>Delete Class</button>
            <button onClick={this.handleAddStudent}>Add Student</button>
            {this.state.addingStudent ? <CreateStudentForm addStudentToKlass={addStudentToKlass} handleStudentSubmit={this.handleStudentSubmit}/> : ''}
          </div>
          <StudentsContainer
            students={students}
            studentProgressions={studentProgressions}
            progressions={progressions}
            videos={videos}
            handleDragOver={this.handleDragOver}
            handleDragLeave={this.handleDragLeave}
            handleDragDrop={this.handleDragDrop}
            removeStudentFromKlass={removeStudentFromKlass} />
          <StudentProgressionsContainer handleDragStart={this.handleDragStart}/>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStudents: (klassId) => dispatch(addStudents(klassId)),
    addStudentToKlass: (klass, student) => dispatch(addStudentToKlass(klass, student)),
    removeStudentFromKlass: (student) => dispatch(removeStudentFromKlass(student)),
    removeKlass: (klass) => dispatch(removeKlass(klass)),
    fetchProgressions: () => dispatch(fetchProgressions()),
    fetchVideos: () => dispatch(fetchVideos()),
    addStudentProgression: (student, progression) => dispatch(addStudentProgression(student, progression))
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    students: state.students,
    studentProgressions: state.studentProgressions,
    progressions: state.progressions,
    videos: state.videos
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassContainer)
