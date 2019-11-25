import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addStudentToKlass, removeStudentFromKlass } from '../../actions/studentActions'
import './css/edit-students.css'
import CreateStudentForm from '../students/CreateStudentForm'


class EditStudents extends Component {

  state = {
    addingStudent: false
  }

  handleAddStudent = () => {
    this.setState({...this.state, addingStudent: !this.state.addingStudent})
  }

  handleStudentSubmit = (event, studentData) => {
    event.preventDefault()
    const { klass, addStudentToKlass } = this.props
    addStudentToKlass(klass.id, studentData)
    this.setState({...this.state, addingStudent: false})
  }

  renderStudentRows = () => {
    const { students } = this.props
    return students.allIds.map((studentId, index) => {
      const student = students.byId[studentId]
      return (
        <tr key={index}>
          <td>
            <div
              className="x-out"
              onClick={e => this.props.removeStudentFromKlass(student)}
              >x</div>
          </td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td></td>
          <td></td>
          <td>
            <button>Edit</button>
          </td>
        </tr>
      )
    })
  }

  render(){
    const { addingStudent } = this.state
    return (
      <div className="edit-students">
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
            {this.renderStudentRows()}
          </tbody>
        </table>
        {addingStudent ? <CreateStudentForm handleAddStudent={this.handleAddStudent} handleStudentSubmit={this.handleStudentSubmit}/> : ''}
        <div className="add-student-button">
          {addingStudent ? '' : <button onClick={this.handleAddStudent}>Add Student</button>}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addStudentToKlass: (klass, student) => dispatch(addStudentToKlass(klass, student)),
    removeStudentFromKlass: (student) => dispatch(removeStudentFromKlass(student))
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

export default connect(mapStateToProps, mapDispatchToProps)(EditStudents)
