import React, { Component } from 'react'
import CreateStudentForm from '../students/CreateStudentForm'
import StudentsContainer from '../students/StudentsContainer'
import StudentProgressionsContainer from '../progressions/StudentProgressionsContainer'
import { connect } from 'react-redux'
import { removeKlass } from '../../actions/klassActions'
import { fetchProgressions } from '../../actions/progressionActions'
import { fetchVideos } from '../../actions/videoActions'
import { addStudents, addStudentToKlass, removeStudentFromKlass } from '../../actions/studentActions'
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

  render(){
    const { klasses, students, match, addStudentToKlass, removeStudentFromKlass } = this.props
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
          <StudentsContainer students={students} removeStudentFromKlass={removeStudentFromKlass} />
          <StudentProgressionsContainer />
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
    fetchVideos: () => dispatch(fetchVideos())
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses, students: state.students}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassContainer)
