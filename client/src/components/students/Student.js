import React, { Component } from 'react'
import StudentAgendaProgression from '../progressions/StudentAgendaProgression'
import './student.css'
import { connect } from 'react-redux'
import { deleteStudentProgression } from '../../actions/studentProgressionActions'

class Student extends Component {
  handleDeleteProgClick = (progression) => {
    const { deleteStudentProgression, student } = this.props
    deleteStudentProgression(student, progression)
  }

  render(){
    const { student, progressions, videos, removeStudentFromKlass, handleDragOver, handleDragLeave, handleDragDrop } = this.props
    return (
      <div className={`student-row`}>
        <div className="student-name">
          <div className="index-progression-x-out" onClick={(event) => removeStudentFromKlass(student)}>x</div>
          <h2>{student.firstName} {student.lastName}</h2>
        </div>
        <div
          className="student-agenda"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
          data-student-id={student.id}
          >
          {progressions.map((progression, index) => <StudentAgendaProgression
                                                      key={index}
                                                      handleDeleteProgClick={this.handleDeleteProgClick}
                                                      videos={videos}
                                                      progression={progression}/>)}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    deleteStudentProgression: (student, progression) => dispatch(deleteStudentProgression(student, progression)),
    // fetchVideos: () => dispatch(fetchVideos())
  }
}

export default connect(null, mapDispatchToProps)(Student)
