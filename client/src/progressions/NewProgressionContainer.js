import React, { Component } from 'react';
import VideoSearchContainer from '../videos/VideoSearchContainer'
import NewProgressionMenuBar from './NewProgressionMenuBar'
import Progression from './Progression'
import DisplayPreview from '../videos/DisplayPreview'
import './Progression.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NewProgressionForm from './NewProgressionForm'
import {
  Redirect
} from "react-router-dom";

class NewProgressionContainer extends Component {
  state = {
    currProgression: [],
    menuSelect: "Add YouTube Video",
    selectedIndex: ""
  }

  handleFormSubmit = (event, formData) => {
    event.preventDefault()
    const params = {
      progression: {
        ...formData,
        videos_attributes: [...this.state.currProgression]
      }
    }
    fetch('/progressions.json', {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        this.props.history.push('/progressions');
      })
  }

  handleDragOver = event => {
    event.preventDefault()
    document.querySelector('.progression').classList.add("drag-over-progression")
  }

  handleDragLeave = event => {
    event.preventDefault()
    document.querySelector('.progression').classList.remove("drag-over-progression")
  }

  handleDragStart = (event, video) => {
    let data = JSON.stringify(video)
    event.dataTransfer.setData("video", data)
  }

  handleOnDrop = (event) => {
    let video = event.dataTransfer.getData("video")
    video = JSON.parse(video)
    this.addToProgression(video)
    document.querySelector('.progression').classList.remove("drag-over-progression")
  }

  addToProgression = (video) => {
    const any = this.state.currProgression.find(vid => vid.videoId === video.videoId)
    if (!any) {
      this.setState({
        ...this.state,
        currProgression: [...this.state.currProgression, video],
        draggedItem: {...this.state.draggedItem}
      })
    }
  }

  handleProgressionItemClick = index => {
    this.setState({
      ...this.state,
      currProgression: [...this.state.currProgression],
      selectedIndex: index,
      menuSelect: "Edit Progression"
    })
  }

  handleMenuClick = (event) => {
    const index = event.target.innerText === "Edit Progression" && this.state.currProgression.length > 0 ? 0 : ""
    this.setState({
      ...this.state,
      selectedIndex: index,
      currProgression: [...this.state.currProgression],
      menuSelect: event.target.innerText
    })
  }

  removeFromProgression = (movie) => {
    this.setState({
      ...this.state,
      currProgression: this.state.currProgression.filter(item => item !== movie),
      menuSelect: "Add YouTube Video",
      selectedIndex: ""
    })
  }

  progressionEmpty = () => {
    return this.state.currProgression.length > 0 ? false : true
  }

  handleDNDDragStart = attributes => {
    const {draggableId, source} = attributes
    document.querySelector(`#item-${draggableId}`).classList.add("item-dragging")
  }

  handleDNDDragEnd = result => {
    const { destination, source, draggableId } = result
    document.querySelector(`#item-${draggableId}`).classList.remove("item-dragging")
    if (!destination) {
      return
    }

    if (destination.index !== source.index) {
      const testArray = [...this.state.currProgression]
      testArray.splice(source.index, 1)
      testArray.splice(destination.index, 0, this.state.currProgression[source.index])
      this.setState({
        ...this.state,
        currProgression: testArray
      })
    }

  }

  render(){
    return (
      <div className="new-progression-container">
        <NewProgressionForm handleFormSubmit={this.handleFormSubmit}/>
        <DragDropContext
          onDragEnd={this.handleDNDDragEnd}
          onDragStart={this.handleDNDDragStart}
          >
          <Droppable droppableId="droppable-1" direction="horizontal">
            {(provided) => (
              <Progression
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                removeFromProgression={this.removeFromProgression}
                currProgression={this.state.currProgression}
                handleProgressionItemClick={this.handleProgressionItemClick}
                handleDragOver={this.handleDragOver}
                handleDragLeave={this.handleDragLeave}
                handleOnDrop={this.handleOnDrop}>
                  {provided.placeholder}
              </Progression>
            )}
          </Droppable>
        </DragDropContext>

        <NewProgressionMenuBar handleMenuClick={this.handleMenuClick} menuSelect={this.state.menuSelect} progressionEmpty={this.progressionEmpty}/>
        {this.state.menuSelect === "Edit Progression" && this.state.selectedIndex !== '' ? <DisplayPreview video={this.state.currProgression[this.state.selectedIndex]} removeFromProgression={this.removeFromProgression}/> : ''}
        {this.state.menuSelect === "Add YouTube Video" ? <VideoSearchContainer addToProgression={this.addToProgression} handleDragStart={this.handleDragStart} /> : ''}
      </div>
    )
  }
}

export default NewProgressionContainer
