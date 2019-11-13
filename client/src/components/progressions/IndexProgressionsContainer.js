import React, { Component } from 'react'
import IndexProgression from './IndexProgression'
import { connect } from 'react-redux'
import { fetchProgressions, deleteProgression } from '../../actions/progressionActions'
import { fetchVideos } from '../../actions/videoActions'

class IndexProgressionsContainer extends Component {
  componentDidMount(){
    this.props.fetchVideos()
    this.props.fetchProgressions()
  }

  render(){
    const { progressions, videos, history, deleteProgression } = this.props
    return (
      <div className="progressions-index-container">
        {progressions.allIds.map((progressionId, index) => {
          const progression = progressions.byId[progressionId]
          return <IndexProgression key={index} progression={progression} videos={videos} history={history} deleteProgression={deleteProgression}/>
        })}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchProgressions: () => dispatch(fetchProgressions()),
    deleteProgression: (progression) => dispatch(deleteProgression(progression)),
    fetchVideos: () => dispatch(fetchVideos())
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    videos: state.videos
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexProgressionsContainer)
