import React, { Component } from 'react'

class EditKlassForm extends Component {
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

  render() {
    return (
      <div>
        <form onSubmit={e => this.props.handleSubmitAddKlass(e, this.state)}>
          <input
            type="text"
            value={this.state.klass.name}
            onChange={this.handleNameChange}
            placeholder="Enter a Class Name"/>
          <input type="submit" value="Add Class" />
        </form>
      </div>
    )
  }

}

export default EditKlassForm
