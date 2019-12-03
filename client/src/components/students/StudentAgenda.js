import React from 'react'
import StudentAgendaProgression from './StudentAgendaProgression'
import { Draggable } from 'react-beautiful-dnd'

const StudentAgenda = ({ placeholder, innerRef, handleDragOver, handleDragLeave, handleDragDrop, handleDeleteProgClick, progressions, student }) => {
  return (
    <div className={`student-agenda`}
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
                      progression={progression}/>
                  </div>
                )}
              </Draggable>)
        } else {
          return (<div key={index}></div>)
        }
      })}
      {placeholder}
    </div>
  )
}

export default StudentAgenda
