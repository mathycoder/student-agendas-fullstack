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

  render(){
    return (
      <div className="progressions-index-container">
        {this.state.progressions.map((progression, index) => {
          return <IndexProgression key={index} progression={progression} />
        })}
      </div>
    )
  }

}

export default IndexProgressionsContainer
