import React, { Component } from 'react';
import VideoSearchContainer from '../videos/VideoSearchContainer'
import NewProgressionMenuBar from './NewProgressionMenuBar'
import NewProgression from './NewProgression'
import DisplayPreview from '../videos/DisplayPreview'
import './Progression.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class NewProgressionContainer extends Component {
  state = {
    id: undefined,
    name: "",
    currProgression: [],
    menuSelect: "Add YouTube Video",
    selectedIndex: ""
  }

  componentDidMount(){
    const progId = this.props.match.params.id
    if (progId && progId !== "new") {
      fetch(`/progressions/${progId}`)
        .then(resp => resp.json())
        .then(json => {
          const jsonSorted = json.videos.sort((a,b) => {
            return a.progression_index - b.progression_index
          })
          this.setState({
            ...this.state,
            currProgression: [...jsonSorted],
            name: json.name,
            id: json.id
          })
        })
    }
  }

  onNameInputChange = event => {
    this.setState({
      ...this.state,
      name: event.target.value,
      currProgression: [...this.state.currProgression]
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const params = {
      progression: {
        name: this.state.name,
        videos_attributes: [...this.state.currProgression]
      }
    }
    if (!this.state.id) {
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
    } else {
      fetch(`/progressions/${this.state.id}.json`, {
        method: 'PATCH',
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
    const {draggableId} = attributes
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

  renderForm = () => {
    return (
      <form className="create-progression-form" onSubmit={this.handleFormSubmit}>
        <input type="text"
          placeholder="Enter a title for this progression"
          value={this.state.name}
          onChange={this.onNameInputChange}/>
        <input type="submit" value="save progression" />
      </form>
    )
  }

  render(){
    return (
      <div className="new-progression-container">
        {this.renderForm()}
        <DragDropContext
          onDragEnd={this.handleDNDDragEnd}
          onDragStart={this.handleDNDDragStart}
          >
          <Droppable droppableId="droppable-1" direction="horizontal">
            {(provided) => (
              <NewProgression
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                removeFromProgression={this.removeFromProgression}
                currProgression={this.state.currProgression}
                handleProgressionItemClick={this.handleProgressionItemClick}
                handleDragOver={this.handleDragOver}
                handleDragLeave={this.handleDragLeave}
                handleOnDrop={this.handleOnDrop} >
                  {provided.placeholder}
              </NewProgression>
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
