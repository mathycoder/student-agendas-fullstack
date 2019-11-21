import React, { Component } from 'react'
import StudentAgendaProgression from '../progressions/StudentAgendaProgression'
import { Draggable } from 'react-beautiful-dnd'

class StudentAgenda extends Component {
  render(){
    const { placeholder, innerRef, handleDragOver, handleDragLeave, handleDragDrop, handleDeleteProgClick, progressions, videos, student } = this.props
    return (
      <div className="student-agenda"
        data-student-id={student.id}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        ref={node => innerRef(node)}
        >
        {progressions.map((progression, index) => {
          if (progression) {
            return (
                <Draggable draggableId={`student-${student.id}-progression-${progression.id}`} index={index} key={`student-${student.id}-progression-${progression.id}`}>
                  {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps}>
                      <StudentAgendaProgression
                        innerRef={provided.innerRef}
                        key={index}
                        handleDeleteProgClick={handleDeleteProgClick}
                        videos={videos}
                        progression={progression}/>
                    </div>

                  )}
                </Draggable>
                )
          } else {
            return (<div></div>)
          }


          })
        }
        {placeholder}
      </div>
    )
  }
}

export default StudentAgenda
