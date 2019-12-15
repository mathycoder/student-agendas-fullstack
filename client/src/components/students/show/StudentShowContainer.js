import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStudentProgressions } from '../../progressions/helpers/getStudentProgressions'
import AssignedProgressions from './AssignedProgressions'
import SubmittedProgressions from './SubmittedProgressions'
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

  render(){
    const { student, assignedProgressions, submittedProgressions } = this.state
    const { progressions, studentProgressions, reflections, videos } = this.props
    if (student && assignedProgressions && submittedProgressions) {
      return (
        <div className="student-show-wrapper index-page">
          <div className="assigned-progressions">
            <AssignedProgressions
              reflections={reflections}
              videos={videos}
              progressions={assignedProgressions}/>
          </div>
          <div className="submitted-progressions">
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
