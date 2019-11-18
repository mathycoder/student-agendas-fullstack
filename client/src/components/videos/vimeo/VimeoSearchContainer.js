import React, { Component } from 'react';
import DisplaySearchResults from '../DisplaySearchResults'
import DisplayPreview from '../DisplayPreview'
import { connect } from 'react-redux'
import { vimeoVideoSearch } from '../../../actions/videoSearchActions'


class VimeoSearchContainer extends Component {
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
    this.props.vimeoVideoSearch(this.state.searchTerm)
  }

  handleVideoClick = (index) => {
    this.setState({
      ...this.state,
      videoIndex: index
    })
  }

  render() {
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
          {this.props.staticState.loading ? <div className="loading"></div>: ''}
          <DisplaySearchResults handleDragStart={this.props.handleDragStart} handleVideoClick={this.handleVideoClick} videos={this.props.videoSearch || []}/>
          {this.state.videoIndex !== "" ? <DisplayPreview shiftup={true} addToProgression={this.props.addToProgression} video={this.props.videoSearch[this.state.videoIndex]}/> : ''}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    videoSearch: state.videoSearch.vimeo.videos,
    staticState: state.videoSearch.vimeo.static
  }
}

function mapDispatchToProps(dispatch){
  return {
    vimeoVideoSearch: (query) => dispatch(vimeoVideoSearch(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VimeoSearchContainer)
