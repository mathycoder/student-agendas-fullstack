import React, { Component } from 'react'
import { Route, NavLink } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'
import NewKlassForm from './NewKlassForm'

class KlassesContainer extends Component {
  state = {
    klasses: []
  }

  componentDidMount(){
    fetch(`/klasses`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          klasses: [...json]
        })
      })
  }

  klassSelectDropdown = () => {
    return (
      <div className="progression-menu-bar">
        <ul>
          {this.state.klasses.map((klass, index) => (
            <li key={index}>{<NavLink to={`/classes/${klass.id}`}>{klass.name}</NavLink>}</li>
          ))}
            <li>{<NavLink to={`/classes/new`}>New Class</NavLink>}</li>
        </ul>
      </div>
    )

  }

  render() {
    return (
      <div>
        {this.klassSelectDropdown()}
        <Route exact path={`${this.props.match.url}/new`} component={NewKlassForm} />
        <Route path={`${this.props.match.url}/:id`} component={ShowKlassContainer} key={Math.random()} />
      </div>
    )
  }

}

export default KlassesContainer
