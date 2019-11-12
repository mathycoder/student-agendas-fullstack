import React, { Component } from 'react'

class KlassesContainer extends Component {
  state = {
    klass: {
      name: ""
    }
  }

  handleNameChange = event => {
    this.setState({
      ...this.state,
      klass: {
        ...this.state.klass,
        name: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addKlass(this.state)
    // this.props.history.push(`/classes/${klass.id}`)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.klass.name}
            onChange={this.handleNameChange}
            placeholder="Enter a Class Name"/>
          <input type="submit" value="Create Class" />
        </form>
      </div>
    )
  }

}

export default KlassesContainer
