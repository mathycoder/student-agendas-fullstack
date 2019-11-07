import React, { Component } from 'react'

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
      <div>Index Progressions Container</div>
    )
  }

}

export default IndexProgressionsContainer
