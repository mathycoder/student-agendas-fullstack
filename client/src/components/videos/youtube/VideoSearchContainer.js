import React, { Component } from 'react';
import DisplaySearchResults from '../DisplaySearchResults'
import DisplayPreview from '../DisplayPreview'
import { connect } from 'react-redux'
import { youTubeVideoSearch } from '../../../actions/videoSearchActions'

class VideoSearchContainer extends Component {
  state = {
    searchTerm: "",
    videoIndex: ''
  }

  componentDidMount(){
    const { staticState } = this.props
    if (staticState.searchTerm) {
      this.setState({...this.state, searchTerm: staticState.searchTerm})
    }
  }

  handleChange = (event) => {
    this.setState({
      videos: this.state.videos,
      searchTerm: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({...this.state, videoIndex: ''})
    this.props.youTubeVideoSearch(this.state.searchTerm)
  }

  handleVideoClick = (index) => {
    this.setState({
      ...this.state,
      videoIndex: index
    })
  }

  render() {
    const { staticState, videoSearch, handleDragStart, addToProgression } = this.props
    const { videoIndex } = this.state
    return (
      <div className="searched-videos-display">
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
        <div className="search-videos-container">
          {staticState.loading ? <div className="loading"></div>: ''}
          {videoSearch.length > 0 ? <DisplaySearchResults handleDragStart={handleDragStart} handleVideoClick={this.handleVideoClick} videos={videoSearch || []}/> : ''}
          {videoIndex !== "" ?
            <DisplayPreview shiftup={true} addToProgression={addToProgression} video={videoSearch[videoIndex]}/>
            : (staticState.loading ? '' : <div className="video-icon"><img src="/projector.png" alt="video projector"/></div>)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    videoSearch: state.videoSearch.youTube.videos,
    staticState: state.videoSearch.youTube.static
  }
}

function mapDispatchToProps(dispatch){
  return {
    youTubeVideoSearch: (query) => dispatch(youTubeVideoSearch(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearchContainer)
