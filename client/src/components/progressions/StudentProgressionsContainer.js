import React, { Component } from 'react'
import StudentProgression from './StudentProgression'
import IndexProgression from './IndexProgression'
import { deleteProgression } from '../../actions/progressionActions'
import { connect } from 'react-redux'

class StudentProgressionsContainer extends Component {
  state = {
    searchTerm: "",
    color: "",
    searchedProgressions: []
  }

  componentDidMount(){
    this.setState({
      ...this.state,
      searchedProgressions: [...this.props.progressions.allIds]
    })
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
      color: "",
      searchedProgressions: this.filterer(event.target.value)
    })
  }

  handleColorClick = (color) => {
    this.setState({
      ...this.state,
      color: color,
      searchedProgressions: this.colorFilterer(color)
    })
  }

  filterer = (query) => {
    const { progressions } = this.props
    return progressions.allIds.filter(progId => {
      const prog = progressions.byId[progId]
      return prog.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  colorFilterer = (color) => {
    const { progressions } = this.props
    return progressions.allIds.filter(progId => {
      const prog = progressions.byId[progId]
      return prog.color === color
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
    const { progressions, videos, handleDragStart, indexPage, deleteProgression, history } = this.props

    return (
      <div className={`student-show-progressions-container ${indexPage ? 'index-page' : ''}`}>
        <div className="student-show-progressions-header">
          <div>Progressions</div>
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
        <div className="student-show-progressions-color-choice">
          {this.displayColors()}
        </div>
        <div className="student-show-progressions-index">
          {this.state.searchedProgressions.map((progressionId, index) => {
            const progression = progressions.byId[progressionId]
            if (!indexPage) {
              return <StudentProgression
                        key={index}
                        handleDragStart={handleDragStart}
                        progression={progression}
                        videos={videos}/>
            } else {
              return <IndexProgression
                        key={index}
                        progression={progression}
                        deleteProgression={deleteProgression}
                        history={history}
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
    deleteProgression: (progression) => dispatch(deleteProgression(progression))
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    videos: state.videos
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProgressionsContainer)
