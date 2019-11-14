import React, { Component } from 'react'
import IndexProgression from './IndexProgression'
import { deleteProgression } from '../../actions/progressionActions'
import { connect } from 'react-redux'

class IndexProgressionsContainer extends Component {
  render(){
    const { progressions, videos, history, deleteProgression } = this.props
    return (
      <div>
        <div className="progressions-index-container">
          {progressions.allIds.map((progressionId, index) => {
            const progression = progressions.byId[progressionId]
            return <IndexProgression key={index} progression={progression} videos={videos} history={history} deleteProgression={deleteProgression}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(IndexProgressionsContainer)
