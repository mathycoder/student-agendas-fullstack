import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentShowContainer extends Component {
  state = {
    student: undefined
  }

  componentDidMount(){
    this.props.handleStudentShowPage()
  }

  componentDidUpdate(){
    const { students, handleSetStudent } = this.props
    const studentId = this.props.match.params.id
    const student = students.byId[`student${studentId}`]
    if (student && !this.state.student){
      handleSetStudent(student)
      this.setState({
        ...this.state,
        student: student
      })
    }
  }

  render(){
    const { student } = this.state
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
