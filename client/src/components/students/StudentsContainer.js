import React, { Component } from 'react'
import Student from './Student'
import './student.css'

class StudentContainer extends Component {

  sortedIds = (students) => {
    return students.allIds.sort((idA, idB) => {
      const studentA = students.byId[idA].firstName.toLowerCase()
      const studentB = students.byId[idB].firstName.toLowerCase()
      if (studentA > studentB) { return 1 }
      else if (studentA < studentB ) {return -1 }
      else {return 0}
    })
  }

  displayStudents = () => {
    const { students, removeStudentFromKlass } = this.props
    return this.sortedIds(students).map((stId, index) => {
      const student = students.byId[stId]
      return (
        <Student key={index} student={student} removeStudentFromKlass={removeStudentFromKlass}/>
    )})
  }

  render(){
    return (
      <div className="student-agendas">
        {this.props.students ? this.displayStudents() : ''}
      </div>
    )
  }
}

export default StudentContainer
