import React, { Component } from 'react'
import { Route } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'

class NewKlassContainer extends Component {
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
    fetch('/klasses', {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        this.props.history.push(`/classes/${json.id}`)
      })
  }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} render={() => (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.klass.name}
              onChange={this.handleNameChange}
              placeholder="Enter a Class Name"/>
            <input type="submit" value="Create Class" />
          </form>
        )} />

        <Route path={`${this.props.match.url}/:id`} component={ShowKlassContainer} />
      </div>

    )
  }

}

export default NewKlassContainer
