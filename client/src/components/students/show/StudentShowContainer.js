import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStudentProgressions } from '../../progressions/helpers/getStudentProgressions'
import AssignedProgressions from './AssignedProgressions'
import SubmittedProgressions from './SubmittedProgressions'
import StudentShowAgenda from './StudentShowAgenda'
import '../css/student-show.css'

class StudentShowContainer extends Component {
  state = {
    student: undefined,
    myProgressions: undefined,
    assignedProgressions: undefined,
    submittedProgressions: undefined
  }

  componentDidMount(){
    this.props.handleStudentShowPage()
  }

  componentDidUpdate(){
    this.setStudent()
    this.setProgressions()
  }

  setProgressions = () => {
    const { progressions, studentProgressions } = this.props
    const { student, incompleteProgressions, completeProgressions, myProgressions } = this.state
    if (!myProgressions && progressions.allIds.length > 0 && student){
      const tempProgressions = getStudentProgressions(student, studentProgressions, progressions)
      this.setState({
        myProgressions: [...tempProgressions],
        assignedProgressions: [...tempProgressions.filter(prog => !prog.submitted)],
        submittedProgressions: [...tempProgressions.filter(prog => prog.submitted)]
      })
    }
  }

  setStudent = () => {
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

  displayColors = () => {
    return (
      <div className="color-logo">
         {["red", "orange", "green", "blue", "purple"].map((color, index) => {
          return (
            <div
              key={index}
              className={`select-color ${color}-title`}>
            </div>
          )
          })}
      </div>
    )

  }

  render(){
    const { student, assignedProgressions, submittedProgressions, myProgressions } = this.state
    const { progressions, studentProgressions, reflections, videos } = this.props
    if (student && assignedProgressions && submittedProgressions) {
      return (
        <div className="student-show-wrapper">
          <div className="student-show-agenda student-agenda">
            <StudentShowAgenda progressions={myProgressions}/>
          </div>
          <div className="assigned-progressions">
            <h2>Incomplete</h2>
            {this.displayColors()}
            <AssignedProgressions
              reflections={reflections}
              videos={videos}
              progressions={assignedProgressions}/>
          </div>
          <div className="submitted-progressions">
            <h2>Submitted</h2>
            {this.displayColors()}
            <SubmittedProgressions
              videos={videos}
              reflections={reflections}
              progressions={submittedProgressions}/>
          </div>
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
    students: state.students,
    progressions: state.progressions,
    studentProgressions: state.studentProgressions,
    reflections: state.reflections,
    videos: state.videos
  }
}

export default connect(mapStateToProps, null)(StudentShowContainer)
