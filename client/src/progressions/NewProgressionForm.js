import React, { Component } from 'react'

export default class NewProgressionForm extends Component {
  state = {
    name: ""
  }

  onNameInputChange = event => {
    this.setState({
      name: event.target.value
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
      </form>

    )
  }
}
