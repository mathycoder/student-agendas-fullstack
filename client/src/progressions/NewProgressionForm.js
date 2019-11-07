import React, { Component } from 'react'

export default class NewProgressionForm extends Component {
  state = {
    progression: {
      name: ""
    }
  }

  onNameInputChange = event => {
    this.setState({
      progression: {
        ...this.state.progression,
        name: event.target.value
      }
    })
  }

  render(){
    return (
      <form className="create-progression-form" onSubmit={event => this.props.handleFormSubmit(event, this.state)}>
        <input type="text"
          placeholder="Enter a title for this progression"
          value={this.state.name}
          onChange={this.onNameInputChange}/>
        <input type="submit" value="save progression" />
        <h1>{this.state.name}</h1>
      </form>

    )
  }
}
