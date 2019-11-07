import React, { Component } from 'react'
import ProgressionDisplay from './ProgressionDisplay'

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
          return <ProgressionDisplay key={index} progression={progression} />
        })}
      </div>
    )
  }

}

export default IndexProgressionsContainer
