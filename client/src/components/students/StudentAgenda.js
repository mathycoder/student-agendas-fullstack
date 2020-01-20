import React from 'react'
import StudentAgendaProgression from './StudentAgendaProgression'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const StudentAgenda = ({ placeholder, innerRef, handleDeleteProgClick, progressions, student }) => {
  return (
    <Droppable droppableId={`droppable-student${student.id}`} direction="horizontal">
      {(provided2) => (
        <div className={`student-agenda`}
          data-student-id={student.id}
          ref={node => provided2.innerRef(node)}
          {...provided2.droppableProps}
          >
          {progressions.map((progression, index) => {
            if (progression && !progression.submitted) {
              return (
                  <Draggable draggableId={`student${student.id}-progression${progression.id}`} index={index} key={`student-${student.id}-progression-${progression.id}-${index}`}>
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
            } else if (progression && progression.submitted) {
              return (
                <div key={index}>
                  <StudentAgendaProgression
                    progression={progression}/>
                </div>
              )
            } else {
              return (<div key={index}></div>)
            }
          })}
          {placeholder}
          {provided2.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default StudentAgenda
