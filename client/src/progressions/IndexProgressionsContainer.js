import React, { Component } from 'react'
import IndexProgression from './IndexProgression'
import { connect } from 'react-redux'
import { fetchProgressions, deleteProgression } from '../actions/progressionActions'

class IndexProgressionsContainer extends Component {
  componentDidMount(){
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
          return <IndexProgression key={index} progression={progression} history={this.props.history} deleteProgression={this.props.deleteProgression}/>
        })}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchProgressions: () => dispatch(fetchProgressions()),
    deleteProgression: (progression) => dispatch(deleteProgression(progression))
  }
}

function mapStateToProps(state){
  return {progressions: state.progressions}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexProgressionsContainer)
