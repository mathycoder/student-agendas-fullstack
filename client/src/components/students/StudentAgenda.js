import React, { Component } from 'react'
import StudentAgendaProgression from '../progressions/StudentAgendaProgression'

class StudentAgenda extends Component {
  render(){
    const { handleDragOver, handleDragLeave, handleDragDrop, handleDeleteProgClick, progressions, videos, student } = this.props
    return (
      <div className="student-agenda"
        data-student-id={student.id}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        >
        {progressions.map((progression, index) => {
          return (
            <StudentAgendaProgression
              key={index}
              handleDeleteProgClick={handleDeleteProgClick}
              videos={videos}
              progression={progression}/>)}
          )
        }
      </div>
    )
  }
}

export default StudentAgenda
