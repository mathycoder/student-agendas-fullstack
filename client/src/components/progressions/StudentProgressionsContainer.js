import React, { Component } from 'react'
import StudentProgression from './StudentProgression'
import { deleteProgression } from '../../actions/progressionActions'
import { connect } from 'react-redux'

class StudentProgressionsContainer extends Component {
  render(){
    const { progressions, videos } = this.props

    return (
      <div className="student-show-progressions-container">
        {progressions.allIds.map((progressionId, index) => {
          const progression = progressions.byId[progressionId]
          return <StudentProgression key={index} progression={progression} videos={videos}/>
        })}
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
