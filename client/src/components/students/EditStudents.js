import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addStudentToKlass, removeStudentFromKlass } from '../../actions/studentActions'
import './css/edit-students.css'


class EditStudents extends Component {

  renderStudentRows = () => {
    const { students } = this.props
    return students.allIds.map(studentId => {
      const student = students.byId[studentId]
      return (
        <tr>
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
    return (
      <div className="edit-students">
        <table>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
          {this.renderStudentRows()}
        </table>
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
