import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addStudentToKlass, removeStudentFromKlass, editStudentInKlass } from '../../actions/studentActions'
import './css/edit-students.css'
import CreateStudentForm from '../students/CreateStudentForm'


class EditStudents extends Component {
  state = {
    addingStudent: false,
    editStudent: false,
    editId: ''
  }

  handleAddStudent = () => {
    if (!this.state.editStudent){
      this.setState({...this.state, addingStudent: !this.state.addingStudent})
    }
  }

  handleCancelStudent = () => {
    this.setState({
      ...this.state,
      addingStudent: false,
      editStudent: false,
      editId: ''
    })
  }

  handleStudentSubmit = (event, studentData) => {
    event.preventDefault()
    const { klass, addStudentToKlass, editStudentInKlass } = this.props
    if (!studentData.id){ addStudentToKlass(klass.id, studentData) }
    else {
      editStudentInKlass(klass.id, studentData)
      this.setState({...this.state, addingStudent: false, editStudent: false, editId: '' })
    }

  }

  handleEditClick = (student) => {
    if (!this.state.addingStudent){
      this.setState({
        ...this.state,
        editStudent: true,
        editId: student.id
      })
    }
  }

  handleRemoveStudentClick = (student) => {
    const { removeStudentFromKlass } = this.props
    const deleteCheck = window.confirm("Are you sure you want to delete this student?  This will also delete all their data.");
    if (deleteCheck) { removeStudentFromKlass(student) }

  }

  renderStudentRows = () => {
    const { students } = this.props
    return students.allIds.map((studentId, index) => {
      const student = students.byId[studentId]
      if (student.id !== this.state.editId){
        return (
          <div
            key={index}
            className={`edit-table-student-row ${index % 2 === 0 ? 'even' : 'odd'}`}
            >
            <div>{student.firstName}</div>
            <div>{student.lastName}</div>
            <div>{student.username}</div>
            <div>{student.password}</div>
            <div><button onClick={e => this.handleEditClick(student)}>Edit</button></div>
            <div><button onClick={e => this.handleRemoveStudentClick(student)}>Delete</button></div>
          </div>
        )
      } else {
        return <CreateStudentForm key={index} student={student} handleCancelStudent={this.handleCancelStudent} handleStudentSubmit={this.handleStudentSubmit}/>
      }

    })
  }

  render(){
    const { addingStudent } = this.state
    return (
      <div className="edit-students">
        <div className="edit-table">
          <div className="edit-table-header">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Username</div>
            <div>Password</div>
            <div className="add-student-button">
              {addingStudent ? '' : <button onClick={this.handleAddStudent}>Add Student</button>}
            </div>
          </div>
          {addingStudent ? <CreateStudentForm handleCancelStudent={this.handleCancelStudent} handleStudentSubmit={this.handleStudentSubmit}/> : ''}
          {this.renderStudentRows()}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addStudentToKlass: (klass, student) => dispatch(addStudentToKlass(klass, student)),
    removeStudentFromKlass: (student) => dispatch(removeStudentFromKlass(student)),
    editStudentInKlass: (klass, student) => dispatch(editStudentInKlass(klass, student))
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
