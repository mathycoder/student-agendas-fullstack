import React, { Component } from 'react'
import StudentProgression from './StudentProgression'
import { deleteProgression } from '../../actions/progressionActions'
import { connect } from 'react-redux'

class StudentProgressionsContainer extends Component {
  componentDidUpdate(){
    console.log(this.props.progressions)
  }

  render(){
    const { progressions, videos, handleDragStart } = this.props

    return (
      <div className="student-show-progressions-container">
        {progressions.allIds.map((progressionId, index) => {
          const progression = progressions.byId[progressionId]
          return <StudentProgression
                    key={index}
                    handleDragStart={handleDragStart}
                    progression={progression}
                    videos={videos}/>
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
