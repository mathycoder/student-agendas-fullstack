import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllSubmittedProgressions } from '../progressions/helpers/getStudentProgressions'
import StudentShowSummary from '../students/show/StudentShowSummary'

class ShowKlassAllProgressions extends Component {

  renderStudentSummaries = () => {
    const { progressions, studentProgressions, reflections, students } = this.props
    if (students.allIds.length > 0 && progressions.allIds.length > 0 && studentProgressions.allIds.length > 0) {
      const myProgs = getAllSubmittedProgressions(students, studentProgressions, progressions)
      return (
        <StudentShowSummary
          reflections={reflections}
          progressions={myProgs}/>
      )
    }
  }

  render(){
    return (
      <div className="summary-column">
        {this.renderStudentSummaries()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    studentProgressions: state.studentProgressions,
    reflections: state.reflections,
    students: state.students
  }
}

export default connect(mapStateToProps, null)(ShowKlassAllProgressions)
