import React, { Component } from 'react';
import './Progression.css';
import ProgressionItem from './ProgressionItem'
import { Draggable } from 'react-beautiful-dnd'

class Progression extends Component {
  displayProgression = () => {
    return (
      this.props.currProgression.map((video, index) => {
        return (
          <Draggable draggableId={video.videoId} index={index} key={video.videoId}>
            {(provided) => {
              return (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  >
                  <ProgressionItem
                    innerRef={provided.innerRef}
                    video={video}
                    index={index}
                    removeFromProgression={this.props.removeFromProgression}
                    handleProgressionItemClick={this.props.handleProgressionItemClick}
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
      <div ref={node => this.props.innerRef(node)} className="progression" onDragOver={this.props.handleDragOver} onDragLeave={this.props.handleDragLeave} onDrop={this.props.handleOnDrop} >
        {this.displayProgression()}
      </div>
    )
  }
}

export default Progression
