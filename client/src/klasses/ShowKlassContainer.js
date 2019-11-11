import React, { Component } from 'react'

class ShowKlassContainer extends Component {

  state = {
    id: "",
    name: ""
  }

  componentDidMount(){
    fetch(`/klasses/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          ...json
        })
      })
  }

  render(){
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    )
  }
}

export default ShowKlassContainer
