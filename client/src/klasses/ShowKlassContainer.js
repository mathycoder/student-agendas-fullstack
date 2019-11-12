import React, { Component } from 'react'
import CreateStudentForm from '../students/CreateStudentForm'
import StudentsContainer from '../students/StudentsContainer'
import { connect } from 'react-redux'
import { removeKlass } from '../actions/klassActions'
import { addStudentToKlass, removeStudentFromKlass } from '../actions/studentActions'

class ShowKlassContainer extends Component {
  state = {
    addingStudent: false
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
    const klass = this.props.klasses.find(klass => klass.id === parseInt(this.props.match.params.id)) || ""
    return (
      <div>
        <h1>{klass.name}</h1>
        <button onClick={this.handleDeleteKlass}>Delete Class</button>
        <button onClick={this.handleAddStudent}>Add Student</button>
        {this.state.addingStudent ? <CreateStudentForm addStudentToKlass={this.props.addStudentToKlass} handleStudentSubmit={this.handleStudentSubmit}/> : ''}
        <StudentsContainer students={klass.students} removeStudentFromKlass={this.props.removeStudentFromKlass} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addStudentToKlass: (klass, student) => dispatch(addStudentToKlass(klass, student)),
    removeStudentFromKlass: (student) => dispatch(removeStudentFromKlass(student)),
    removeKlass: (klass) => dispatch(removeKlass(klass))
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassContainer)
