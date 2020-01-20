import React from 'react'
import StudentAgendaProgression from './StudentAgendaProgression'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const StudentAgenda = ({ handleDeleteProgClick, progressions, student }) => {
  return (
    <div className={`student-agenda`}
      data-student-id={student.id}
      >
        <div className="undroppable-area">
          {progressions.filter(pr => pr.submitted).map((progression, index) => {
            return (
              <div key={index}>
                <StudentAgendaProgression
                  progression={progression}/>
              </div>
          )})}
        </div>

        <Droppable droppableId={`droppable-student${student.id}`} direction="horizontal">
          {(provided2, snapshot2) => (
            <div
              ref={node => provided2.innerRef(node)}
              {...provided2.droppableProps}
              className={`droppable-area ${snapshot2.isDraggingOver ? 'dragging-over' : ''}`}>
              {progressions.filter(pr => !pr.submitted).map((progression, index) => {
                return (
                  <Draggable draggableId={`student${student.id}-progression${progression.id}`} index={index} key={`student-${student.id}-progression-${progression.id}-${index}`}>
                    {(provided) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps}>
                        <StudentAgendaProgression
                          innerRef={provided.innerRef}
                          key={index}
                          placedholder={provided.placeholder}
                          handleDeleteProgClick={handleDeleteProgClick}
                          progression={progression}/>
                      </div>
                    )}
                  </Draggable>
              )})}
              {provided2.placeholder}
            </div>

          )}
        </Droppable>
      </div>
  )
}

export default StudentAgenda
