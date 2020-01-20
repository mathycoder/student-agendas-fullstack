import React from 'react'
import RenderItem from '../progressions/RenderItem.js'
import { Draggable } from 'react-beautiful-dnd'

const StudentProgression = ({ progression, handlePlusClick, index, innerRef, placeholder }) => {
  if (progression){
    return (
      <div className="progression-container-box" ref={node => innerRef(node)}>
        {handlePlusClick ?
          <div onClick={e => handlePlusClick(e, progression)}>
            <button>+</button>
          </div>
          : ''
        }
        <Draggable draggableId={`progression${progression.id}`} index={index} key={`progression${progression.id}`}>
          {(provided2, snapshot) => {
            return (
              <>
                <div {...provided2.dragHandleProps} {...provided2.draggableProps}>
                  <div
                    className={`student-show-progression ${progression.color}`}
                    ref={node => provided2.innerRef(node)}
                    >
                    <div className={`student-show-progression-title ${progression.color}-title`}>{progression.name}</div>
                    <div className="student-show-progression-items">
                      <RenderItem progression={progression} />
                    </div>
                  </div>
                </div>
                {snapshot.isDragging && (
                  <div className={`student-show-progression ${progression.color}`}>
                    <div className={`student-show-progression-title ${progression.color}-title`}>{progression.name}</div>
                    <div className="student-show-progression-items">
                      <RenderItem progression={progression} />
                    </div>
                  </div>
                )}
              </>
          )}}
        </Draggable>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default StudentProgression
