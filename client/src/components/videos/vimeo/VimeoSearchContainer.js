import React from 'react';
import SearchContainer from '../SearchContainer'
import { connect } from 'react-redux'
import { vimeoVideoSearch } from '../../../actions/videoSearchActions'

const VimeoSearchContainer = ({ staticState, videoSearch, handleDragStart, addToProgression, dispatchVideoSearch }) => (
      <SearchContainer
        staticState={staticState}
        videoSearch={videoSearch}
        handleDragStart={handleDragStart}
        addToProgression={addToProgression}
        dispatchVideoSearch={dispatchVideoSearch}
        />
    )

function mapStateToProps(state){
  const { vimeo } = state.videoSearch
  return {
    videoSearch: vimeo.videos,
    staticState: vimeo.static
  }
}

function mapDispatchToProps(dispatch){
  return {
    dispatchVideoSearch: (query) => dispatch(vimeoVideoSearch(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VimeoSearchContainer)
