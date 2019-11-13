import React, { Component } from 'react'
import IndexProgression from './IndexProgression'
import { connect } from 'react-redux'
import { fetchProgressions } from '../actions/progressionActions'

class IndexProgressionsContainer extends Component {
  state = {
    progressions: []
  }

  componentDidMount(){
    this.props.fetchProgressions()
  }

  componentDidUpdate(){
    console.log(this.props.progressions)
  }

  deleteProgression = (progression) => {
    fetch(`/progressions/${progression.id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          progressions: this.state.progressions.filter(prog => prog.id !== json.id)
        })
      })
  }



  render(){
    return (
      <div className="progressions-index-container">
        {this.props.progressions.allIds.map((progressionId, index) => {
          const progression = this.props.progressions.byId[progressionId]
          return <IndexProgression key={index} progression={progression} history={this.props.history} deleteProgression={this.deleteProgression}/>
        })}
      </div>
    )
  }

}

function mapDispatchToProps(dispatch){
  return {
    fetchProgressions: () => dispatch(fetchProgressions())
  }
}

function mapStateToProps(state){
  return {progressions: state.progressions}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexProgressionsContainer)
