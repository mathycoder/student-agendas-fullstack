import React, { Component } from 'react'
import IndexProgression from './IndexProgression'
import { connect } from 'react-redux'
import { fetchProgressions, deleteProgression } from '../actions/progressionActions'
import { fetchVideos } from '../actions/videoActions'

class IndexProgressionsContainer extends Component {
  componentDidMount(){
    this.props.fetchVideos()
    this.props.fetchProgressions()
  }

  componentDidUpdate(){
    console.log(this.props.progressions)
  }

  render(){
    return (
      <div className="progressions-index-container">
        {this.props.progressions.allIds.map((progressionId, index) => {
          const progression = this.props.progressions.byId[progressionId]
          return <IndexProgression key={index} progression={progression} videos={this.props.videos} history={this.props.history} deleteProgression={this.props.deleteProgression}/>
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
