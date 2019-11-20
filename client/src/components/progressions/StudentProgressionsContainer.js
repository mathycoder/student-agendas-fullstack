import React, { Component } from 'react'
import StudentProgression from './StudentProgression'
import { deleteProgression } from '../../actions/progressionActions'
import { connect } from 'react-redux'

class StudentProgressionsContainer extends Component {
  state = {
    searchTerm: "",
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
      searchedProgressions: this.filterer(event.target.value)
    })
  }

  filterer = (query) => {
    const { progressions } = this.props
    return progressions.allIds.filter(progId => {
      const prog = progressions.byId[progId]
      return prog.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render(){
    const { progressions, videos, handleDragStart } = this.props

    return (
      <div className="student-show-progressions-container">
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
        <div className="student-show-progressions-index">
          {this.state.searchedProgressions.map((progressionId, index) => {
            const progression = progressions.byId[progressionId]
            return <StudentProgression
                      key={index}
                      handleDragStart={handleDragStart}
                      progression={progression}
                      videos={videos}/>
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
