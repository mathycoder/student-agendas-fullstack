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
    const selectedTab = event.target.dataset.option || event.target.parentElement.dataset.option
    const index = selectedTab === "Edit Progression" && this.state.currProgression.length > 0 ? 0 : ""

    if (selectedTab === "Add Reflection" && this.containsReflection()){
      addFlashMessage("Your progression already has a reflection (currently limited to one)")
    } else {
      this.setState({
        ...this.state,
        selectedIndex: index,
        currProgression: [...this.state.currProgression],
        menuSelect: selectedTab
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
    if (!attributes.draggableId.startsWith("query")) {
      document.querySelector(`#item-${draggableId}`).classList.add("item-dragging")
    }
  }

  handleDNDDragEnd = result => {
    const { destination, source, draggableId } = result
    const { currProgression } = this.state
    const testArray = [...currProgression]
    if (!result.draggableId.startsWith("query")) {
      document.querySelector(`#item-${draggableId}`).classList.remove("item-dragging")
    }

    if (!destination) {
      return
    }

    if (result.source.droppableId === "droppable-1") {
      if (destination.index !== source.index) {
        testArray.splice(source.index, 1)
        testArray.splice(destination.index, 0, this.state.currProgression[source.index])
        this.setState({
          ...this.state,
          currProgression: testArray
        })
      }
    } else if (destination.droppableId === "droppable-1"){
        const { addFlashMessage, youTubeVideos, vimeoVideos } = this.props
        const newVideo = youTubeVideos.find(vid => vid.videoId === result.draggableId.split("query-")[1]) || vimeoVideos.find(vid => vid.videoId === result.draggableId.split("query-")[1])
        if (newVideo){
          const any = currProgression.find(vid => vid.videoId === newVideo.videoId)
          if (!any) {
            testArray.splice(destination.index, 0, newVideo)
            this.setState({
              ...this.state,
              currProgression: testArray
            })
          } else {
            addFlashMessage("Your progression already contains this video")
          }
        }
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
        <input type="submit" value="save" />
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
      <div className="new-progression-wrapper">

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
                >
                  {provided.placeholder}
              </NewProgression>
            )}
          </Droppable>

      </div>
    )
  }

  renderAddingItemsTemplate = () => {
    const {selectedIndex, currProgression} = this.state
    return (
      <div>
        <NewProgressionMenuBar handleMenuClick={this.handleMenuClick} menuSelect={this.state.menuSelect} progressionEmpty={this.progressionEmpty}/>
        {this.state.menuSelect === "Edit Progression" && selectedIndex !== '' && currProgression[selectedIndex].videoId ? <DisplayPreview video={currProgression[selectedIndex]} removeFromProgression={this.removeFromProgression}/> : ''}
        {this.state.menuSelect === "Edit Progression" && selectedIndex !== '' && currProgression[selectedIndex].question1 ? <NewReflection key={selectedIndex} reflection={currProgression[selectedIndex]} addToProgression={this.addToProgression} editReflectionItem={this.editReflectionItem} /> : ''}
        {this.state.menuSelect === "Add YouTube Video" ? <YouTubeSearchContainer addToProgression={this.addToProgression} /> : ''}
        {this.state.menuSelect === "Add Vimeo Video" ? <VimeoSearchContainer addToProgression={this.addToProgression} /> : ''}
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
      <DragDropContext
        onDragEnd={this.handleDNDDragEnd}
        onDragStart={this.handleDNDDragStart}
        >
        <div className="new-progression-container">
          {this.renderForm()}
          {this.renderProgressionTemplate()}
          {this.renderAddingItemsTemplate()}
        </div>
      </DragDropContext>
    )
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    videos: state.videos,
    reflections: state.reflections,
    youTubeVideos: state.videoSearch.youTube.videos,
    vimeoVideos: state.videoSearch.vimeo.videos
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
