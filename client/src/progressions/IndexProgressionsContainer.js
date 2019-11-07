import React, { Component } from 'react'
import IndexProgression from './IndexProgression'

class IndexProgressionsContainer extends Component {
  state = {
    progressions: []
  }

  componentDidMount(){
    fetch('/progressions')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          progressions: [...json]
        })
      })
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
        {this.state.progressions.map((progression, index) => {
          return <IndexProgression key={index} progression={progression} deleteProgression={this.deleteProgression}/>
        })}
      </div>
    )
  }

}

export default IndexProgressionsContainer
