import React, { Component } from 'react';
import './Progression.css';
import NewProgressionItem from './NewProgressionItem'
import { Draggable } from 'react-beautiful-dnd'

class NewProgression extends Component {
  displayProgression = () => {
    const { placeholder, currProgression, removeFromProgression, handleProgressionItemClick } = this.props
    return (
      currProgression.map((video, index) => {
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
