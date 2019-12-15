import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentShowContainer extends Component{
  render(){
    const { students } = this.props
    const studentId = this.props.match.params.id
    const student = students.byId[`student${studentId}`]
    if (student) {
      return (
        <div>
          {student.firstName}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    students: state.students
  }
}

export default connect(mapStateToProps, null)(StudentShowContainer)
