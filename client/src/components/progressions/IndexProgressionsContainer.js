import React, { Component } from 'react'
import StudentProgression from '../students/StudentProgression'
import IndexProgression from './IndexProgression'
import { NavLink } from 'react-router-dom'
import { deleteProgression } from '../../actions/progressionActions'
import { connect } from 'react-redux'
import { addProgressionToKlass } from '../../actions/studentProgressionActions'

class IndexProgressionsContainer extends Component {
  state = {
    searchTerm: "",
    color: "",
    recent: undefined,
    searchedProgressions: [],
    initialLoad: false
  }

  componentDidMount(){
    this.initialLoad()
  }

  componentDidUpdate(){
    this.initialLoad()
  }

  initialLoad = () => {
    if (!this.state.initialLoad && this.props.progressions.allIds.length > 0){
      this.setState({
        ...this.state,
        initialLoad: true,
        searchedProgressions: this.alphabeticalProgressions()
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
      color: "",
      recent: undefined,
      searchedProgressions: this.filterer(event.target.value)
    })
  }

  handleColorClick = (color) => {
    this.setState({
      ...this.state,
      color: color,
      recent: undefined,
      searchedProgressions: this.colorFilterer(color)
    })
  }

  handleRecentClick = () => {
    const { progressions } = this.props
    const progressionCopy = [...progressions.allIds]
    const sortedProgressions =  progressionCopy.sort((a,b) => {
      const progA = progressions.byId[a]
      const progB = progressions.byId[b]
      if (progA.updated_at > progB.updated_at) { return -1 }
      else if (progA.updated_at < progB.updated_at) { return 1 }
      else {return 0 }
    })
    this.setState({
      ...this.state,
      color: '',
      recent: true,
      searchedProgressions: sortedProgressions
    })
  }

  filterer = (query) => {
    const { progressions } = this.props
    return this.alphabeticalProgressions().filter(progId => {
      const prog = progressions.byId[progId]
      return prog.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  colorFilterer = (color) => {
    const { progressions } = this.props
    return this.alphabeticalProgressions().filter(progId => {
      const prog = progressions.byId[progId]
      return prog.color === color
    })
  }

  alphabeticalProgressions = () => {
    const { progressions } = this.props
    const allIdsCopy = [...progressions.allIds]
    return allIdsCopy.sort((a,b) => {
      const progA = progressions.byId[a]
      const progB = progressions.byId[b]
      if (progA.name > progB.name) { return 1 }
      else if (progA.name < progB.name) { return -1 }
      else {return 0 }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  handleDeleteProgression = (progression) => {
    const { deleteProgression } = this.props
    const deleteCheck = window.confirm("Are you sure you want to delete this progression?  This will delete the progression from all student agendas.");
    if (deleteCheck) { deleteProgression(progression) }
  }

  handlePlusClick = (event, progression) => {
    const { klass, addProgressionToKlass } = this.props
    const deleteCheck = window.confirm("Add this progression to each student agenda?");
    if (deleteCheck) { addProgressionToKlass(klass, progression) }
  }

  displayColors = () => {
    return ["red", "orange", "green", "blue", "purple"].map((color, index) => {
      return (
        <div
          key={index}
          className={`select-color ${color}-title ${color === this.state.color ? 'selected-color' : ''}`}
          onClick={event => this.handleColorClick(color)}>
        </div>
      )
    })
  }

  render(){
    const { progressions, videos, reflections, handleDragStart, indexPage, history } = this.props

    return (
      <div className={`student-show-progressions-container ${indexPage ? 'index-page' : ''}`}>
        <div className="student-show-progressions-header">
          <div><NavLink to={'/progressions'}>Progressions</NavLink></div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="search-bar">
                <div className="mag-glass"></div>
                <input
                  type="text"
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                  />
                <input type="submit" value="Search"/>
              </div>
            </form>
          </div>
        </div>
        <div className="search-filters">
          <div className="student-show-progressions-color-choice">
            {this.displayColors()}
          </div>
          <div>
            <button
              onClick={this.handleRecentClick}
              className={this.state.recent ? 'recent': ''}
              >Most Recent</button>
          </div>
        </div>
        <div className="student-show-progressions-index">
          {this.state.searchedProgressions.map((progressionId, index) => {
            const progression = progressions.byId[progressionId]
            if (!indexPage) {
              return <StudentProgression
                        key={index}
                        handleDragStart={handleDragStart}
                        handlePlusClick={this.handlePlusClick}
                        progression={progression}
                        reflections={reflections}
                        videos={videos}/>
            } else {
              return <IndexProgression
                        key={index}
                        progression={progression}
                        handleDeleteProgression={this.handleDeleteProgression}
                        history={history}
                        reflections={reflections}
                        videos={videos}/>
            }

          })}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    deleteProgression: (progression) => dispatch(deleteProgression(progression)),
    addProgressionToKlass: (klass, progression) => dispatch(addProgressionToKlass(klass, progression))
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    videos: state.videos,
    reflections: state.reflections
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexProgressionsContainer)
