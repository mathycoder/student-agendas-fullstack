import React, { Component } from 'react';
import VideoSearchContainer from '../videos/youtube/VideoSearchContainer'
import VimeoSearchContainer from '../videos/vimeo/VimeoSearchContainer'
import NewProgressionMenuBar from './NewProgressionMenuBar'
import NewProgression from './NewProgression'
import DisplayPreview from '../videos/DisplayPreview'
import NewReflection from '../reflections/NewReflection'
import './Progression.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import { addProgression, editProgression } from '../../actions/progressionActions'

class NewProgressionContainer extends Component {
  state = {
    id: undefined,
    name: "",
    color: "blue",
    currProgression: [],
    menuSelect: "Add YouTube Video",
    selectedIndex: ""
  }

  loadProgressionIntoState = () => {
    const progId = this.props.match.params.id
    if (progId && progId !== "new" && !this.state.id && this.props.videos.allIds.length > 0 && this.props.progressions.allIds.length > 0) {
      const progression = this.props.progressions.byId[`progression${progId}`]
      const progressionVideos = progression.videos.map(vidId => this.props.videos.byId[vidId])

      this.setState({
        ...this.state,
        currProgression: [...progressionVideos],
        name: progression.name,
        id: progression.id,
        color: progression.color
      })

    }
  }

  componentDidMount(){
    this.loadProgressionIntoState()
  }

  componentDidUpdate(){
    this.loadProgressionIntoState()
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
    const progression = {
      progression: {
        id: this.state.id,
        name: this.state.name,
        color: this.state.color,
        videos_attributes: [...this.state.currProgression]
      }
    }
    if (!this.state.id) {
      this.props.addProgression(progression)
      this.props.history.push('/progressions');
    } else {
      this.props.editProgression(progression)
      this.props.history.push('/progressions');
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
        <div className={`new-progression-title ${this.state.color}-title`}>
          <input type="text"
            required
            placeholder="Enter a title for this progression"
            value={this.state.name}
            onChange={this.onNameInputChange}/>
        </div>
        <div className="color-container">
          <div className="select-color red-title" onClick={event => this.handleColorClick("red")}></div>
          <div className="select-color orange-title" onClick={event => this.handleColorClick("orange")}></div>
          <div className="select-color green-title" onClick={event => this.handleColorClick("green")}></div>
          <div className="select-color blue-title" onClick={event => this.handleColorClick("blue")}></div>
          <div className="select-color purple-title" onClick={event => this.handleColorClick("purple")}></div>
        </div>
        <input type="submit" value="save progression" />
      </form>
    )
  }

  handleColorClick = (color) => {
    this.setState({
      ...this.state,
      currProgression: [...this.state.currProgression],
      color: color
    })
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
                placeholder={provided.placeholder}
                color={this.state.color}
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
        {this.state.menuSelect === "Add Vimeo Video" ? <VimeoSearchContainer addToProgression={this.addToProgression} handleDragStart={this.handleDragStart} /> : ''}
        {this.state.menuSelect === "Add Reflection" ? <NewReflection addToProgression={this.addToProgression} handleDragStart={this.handleDragStart} /> : ''}

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    videos: state.videos
  }
}

function mapDispatchToProps(dispatch){
  return {
    addProgression: (progression) => dispatch(addProgression(progression)),
    editProgression: (progression) => dispatch(editProgression(progression))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProgressionContainer)
