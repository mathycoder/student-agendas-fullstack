import React, { Component } from 'react'
import CreateStudentForm from '../students/CreateStudentForm'
import StudentsContainer from '../students/StudentsContainer'
import { connect } from 'react-redux'
import { removeKlass } from '../actions/klassActions'
import { addStudents, addStudentToKlass, removeStudentFromKlass } from '../actions/studentActions'

class ShowKlassContainer extends Component {
  state = {
    addingStudent: false
  }

  componentDidMount(){
    const klassId = this.props.match.params.id
    this.props.fetchStudents(klassId)
  }

  componentDidUpdate(){
    console.log(this.props.students)
  }

  handleAddStudent = () => {
    this.setState({
      ...this.state,
      addingStudent: true
    })
  }

  handleStudentSubmit = (event, studentData) => {
    event.preventDefault()
    const klassId = parseInt(this.props.match.params.id)
    this.props.addStudentToKlass(klassId, studentData)
  }

  handleDeleteKlass = (event) => {
    const klassId = parseInt(this.props.match.params.id)
    this.props.removeKlass(klassId)
  }

  render(){
    const klassId = this.props.klasses.allIds.find(klassId => klassId === `klass${this.props.match.params.id}`) || ""
    const klass = this.props.klasses.byId[klassId]
    if (klass) {
      return (
        <div>
          <h1>{klass.name}</h1>
          <button onClick={this.handleDeleteKlass}>Delete Class</button>
          <button onClick={this.handleAddStudent}>Add Student</button>
          {this.state.addingStudent ? <CreateStudentForm addStudentToKlass={this.props.addStudentToKlass} handleStudentSubmit={this.handleStudentSubmit}/> : ''}
          <StudentsContainer students={klass.students} removeStudentFromKlass={this.props.removeStudentFromKlass} />
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
    removeKlass: (klass) => dispatch(removeKlass(klass))
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses, students: state.students}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassContainer)
