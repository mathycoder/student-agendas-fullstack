import React, { Component } from 'react'
import CreateStudentForm from '../students/CreateStudentForm'
import StudentsContainer from '../students/StudentsContainer'

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
    const params = {
      student: {
        ...studentData
      }
    }

    const klassId = parseInt(this.props.match.params.id)

    fetch(`/klasses/${klassId}/students`, {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          ...this.state,
          addingStudent: false
        })
        this.props.addStudentToKlass(json)
      })
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

export default ShowKlassContainer