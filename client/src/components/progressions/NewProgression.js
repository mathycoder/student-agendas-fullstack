import React, { Component } from 'react';
import './Progression.css';
import NewProgressionItem from './NewProgressionItem'
import { Draggable } from 'react-beautiful-dnd'

class NewProgression extends Component {

  renderVideoDraggable = (video, index) => {
    const { removeFromProgression, handleProgressionItemClick } = this.props
    const videoId = video.videoId
    return (
      <Draggable draggableId={videoId} index={index} key={videoId}>
        {(provided) => {
          return (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              >
              <NewProgressionItem
                innerRef={provided.innerRef}
                video={video}
                index={index}
                removeFromProgression={removeFromProgression}
                handleProgressionItemClick={handleProgressionItemClick}
              />
            </div>
        )}}
    </Draggable>
    )
  }

  renderReflectionDraggable = (reflection, index) => {
    const { removeFromProgression, handleProgressionItemClick } = this.props
    const tempId = reflection.tempId
    return (
      <Draggable draggableId={tempId} index={index} key={tempId}>
        {(provided) => {
          return (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              >
              <NewProgressionItem
                innerRef={provided.innerRef}
                reflection={reflection}
                index={index}
                removeFromProgression={removeFromProgression}
                handleProgressionItemClick={handleProgressionItemClick}
              />
            </div>
        )}}
    </Draggable>
    )
  }

  displayProgression = () => {
    const { currProgression, removeFromProgression, handleProgressionItemClick } = this.props
    return (
      currProgression.map((item, index) => {
        if (item.videoId) {
          return this.renderVideoDraggable(item, index)
        } else {
          return this.renderReflectionDraggable(item, index)
        }

      })
    )
  }

  render(){
    return (
      <div ref={node => this.props.innerRef(node)} className={`progression ${this.props.color}`} onDragOver={this.props.handleDragOver} onDragLeave={this.props.handleDragLeave} onDrop={this.props.handleOnDrop} >
        {this.displayProgression()}
      </div>
    )
  }
}

export default NewProgression
