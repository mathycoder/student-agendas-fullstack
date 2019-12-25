import React, { Component } from 'react';
import YouTubeSearchContainer from '../videos/youtube/YouTubeSearchContainer'
import VimeoSearchContainer from '../videos/vimeo/VimeoSearchContainer'
import NewProgressionMenuBar from './NewProgressionMenuBar'
import NewProgression from './NewProgression'
import DisplayPreview from '../videos/DisplayPreview'
import NewReflection from '../reflections/NewReflection'
import './Progression.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import { addProgression, editProgression } from '../../actions/progressionActions'
import { addFlashMessage } from '../../actions/flashActions'

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
    const { videos, reflections, progressions, match } = this.props
    const progId = match.params.id
    if (progId && progId !== "new" && !this.state.id && videos.allIds.length > 0 && reflections.allIds.length > 0 && progressions.allIds.length > 0) {
      const progression = progressions.byId[`progression${progId}`]
      const progressionItems = progression.items.map(videoOrReflectionId => (
        videoOrReflectionId.includes("video") ? videos.byId[videoOrReflectionId] : reflections.byId[videoOrReflectionId]
      ))

      this.setState({
        ...this.state,
        currProgression: [...progressionItems],
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
    const { addProgression, editProgression, history, addFlashMessage } = this.props
    event.preventDefault()
    const progression = {
      progression: {
        id: this.state.id,
        name: this.state.name,
        color: this.state.color,
        items_attributes: [...this.state.currProgression]
      }
    }
    const reflectionExists = progression.progression.items_attributes.find(item => item.question1)
    if (reflectionExists){
      !this.state.id ? addProgression(progression, history) : editProgression(progression, history)
    } else {
      addFlashMessage("Your progression must contain one reflection")
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
    this.addToProgression(event, video)
    document.querySelector('.progression').classList.remove("drag-over-progression")
  }

  addToProgression = (e, item) => {
    e.preventDefault()
    // if it's a video
    const { addFlashMessage } = this.props
    if (item.videoId) {
      const any = this.state.currProgression.find(vid => vid.videoId === item.videoId)
      if (!any) {
        this.setState({
          ...this.state,
          currProgression: [...this.state.currProgression, item]
        })
      } else {
        addFlashMessage("Your progression already contains this video")
      }
    // if it's a reflection
    } else {
      if (this.containsReflection()) {
        addFlashMessage("A progression can only contain one reflection")
        this.setState({
          ...this.state,
          menuSelect: ''
        })
      } else {
        this.setState({
          ...this.state,
          menuSelect: '',
          currProgression: [...this.state.currProgression, item]
        })
      }
    }
  }

  editReflectionItem = (item) => {
    const editedProgression = [...this.state.currProgression]
    editedProgression[this.state.selectedIndex] = item
    this.setState({
      ...this.state,
      currProgression: editedProgression,
      menuSelect: ''
    })
  }

  handleProgressionItemClick = index => {
    const { currProgression } = this.state
    this.setState({
      ...this.state,
      currProgression: [...currProgression],
      selectedIndex: index,
      menuSelect: "Edit Progression"
    })
  }

  handleMenuClick = (event) => {
    const { addFlashMessage } = this.props
    const selectedTab = event.target.innerText
    const index = selectedTab === "Edit Progression" && this.state.currProgression.length > 0 ? 0 : ""

    if (selectedTab === "Add Reflection" && this.containsReflection()){
      addFlashMessage("Your progression already has a reflection (currently limited to one)")
    } else {
      this.setState({
        ...this.state,
        selectedIndex: index,
        currProgression: [...this.state.currProgression],
        menuSelect: event.target.innerText
      })
    }
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

  renderProgressionTemplate = () => {
    return (
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
    )
  }

  renderAddingItemsTemplate = () => {
    const {selectedIndex, currProgression} = this.state
    return (
      <div>
        <NewProgressionMenuBar handleMenuClick={this.handleMenuClick} menuSelect={this.state.menuSelect} progressionEmpty={this.progressionEmpty}/>
        {this.state.menuSelect === "Edit Progression" && selectedIndex !== '' && currProgression[selectedIndex].videoId ? <DisplayPreview video={currProgression[selectedIndex]} removeFromProgression={this.removeFromProgression}/> : ''}
        {this.state.menuSelect === "Edit Progression" && selectedIndex !== '' && currProgression[selectedIndex].question1 ? <NewReflection key={selectedIndex} reflection={currProgression[selectedIndex]} addToProgression={this.addToProgression} editReflectionItem={this.editReflectionItem} handleDragStart={this.handleDragStart} /> : ''}
        {this.state.menuSelect === "Add YouTube Video" ? <YouTubeSearchContainer addToProgression={this.addToProgression} handleDragStart={this.handleDragStart} /> : ''}
        {this.state.menuSelect === "Add Vimeo Video" ? <VimeoSearchContainer addToProgression={this.addToProgression} handleDragStart={this.handleDragStart} /> : ''}
        {this.state.menuSelect === "Add Reflection" ? <NewReflection reflection='' addToProgression={this.addToProgression} editReflectionItem={this.editReflectionItem} handleDragStart={this.handleDragStart} /> : ''}
      </div>
    )
  }

  containsReflection = () => {
    const { currProgression } = this.state
    return !!currProgression.find(item => item.question1)
  }

  render(){
    return (
      <div className="new-progression-container">
        {this.renderForm()}
        {this.renderProgressionTemplate()}
        {this.renderAddingItemsTemplate()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    videos: state.videos,
    reflections: state.reflections
  }
}

function mapDispatchToProps(dispatch){
  return {
    addProgression: (progression, history) => dispatch(addProgression(progression, history)),
    editProgression: (progression, history) => dispatch(editProgression(progression, history)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProgressionContainer)
