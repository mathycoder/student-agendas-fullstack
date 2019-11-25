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

  handleEditClick = (student) => {
    this.setState({
      ...this.state,
      editStudent: true,
      editId: student.id
    })
  }

  renderStudentRows = () => {
    const { students } = this.props
    return students.allIds.map((studentId, index) => {
      const student = students.byId[studentId]
      if (student.id !== this.state.editId){
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
            <div><button onClick={e => this.handleEditClick(student)}>Edit</button></div>
          </div>
        )
      } else {
        return <CreateStudentForm handleAddStudent={this.handleAddStudent} handleStudentSubmit={this.handleStudentSubmit}/>
      }

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
          <div className="add-student-button">
            <div>
              {addingStudent ? '' : <button onClick={this.handleAddStudent}>Add Student</button>}
            </div>
          </div>
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
