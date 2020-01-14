import React from 'react';
import SearchContainer from '../SearchContainer'
import { connect } from 'react-redux'
import { youTubeVideoSearch } from '../../../actions/videoSearchActions'

const YouTubeSearchContainer = ({ staticState, videoSearch, handleDragStart, addToProgression, dispatchVideoSearch }) => (
      <SearchContainer
        staticState={staticState}
        videoSearch={videoSearch}
        handleDragStart={handleDragStart}
        addToProgression={addToProgression}
        dispatchVideoSearch={dispatchVideoSearch}
        />
    )

function mapStateToProps(state){
  const { youTube } = state.videoSearch
  return {
    videoSearch: youTube.videos,
    staticState: youTube.static
  }
}

function mapDispatchToProps(dispatch){
  return {
    dispatchVideoSearch: (query) => dispatch(youTubeVideoSearch(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeSearchContainer)
