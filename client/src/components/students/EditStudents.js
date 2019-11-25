import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addStudentToKlass, removeStudentFromKlass } from '../../actions/studentActions'
import './css/edit-students.css'
import CreateStudentForm from '../students/CreateStudentForm'


class EditStudents extends Component {
  state = {
    addingStudent: false,
    editStudent: false,
    editId: ''
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
        <div key={index} className="edit-table-student-row">
          <div>
            <div
              className="x-out"
              onClick={e => this.props.removeStudentFromKlass(student)}
              >x</div>
          </div>
          <div>{student.firstName}</div>
          <div>{student.lastName}</div>
          <div><button>Edit</button></div>
        </div>
      )
    })
  }

  render(){
    const { addingStudent } = this.state
    return (
      <div className="edit-students">
        <div className="edit-table">
          <div className="edit-table-header">
            <div></div>
            <div>First Name</div>
            <div>Last Name</div>
            <div></div>
          </div>
          {this.renderStudentRows()}
          {addingStudent ? <CreateStudentForm handleAddStudent={this.handleAddStudent} handleStudentSubmit={this.handleStudentSubmit}/> : ''}
        </div>
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
