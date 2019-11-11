import React, { Component } from 'react'
import { Route, NavLink } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'
import NewKlassForm from './NewKlassForm'

class KlassesContainer extends Component {
  state = {
    klasses: [],
    klassId: undefined
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

  updateKlassId = (id) => {
    this.setState({
      klasses: [...this.state.klasses],
      klassId: id
    })
  }

  addKlass = (klass) => {
    this.setState({
      ...this.state,
      klasses: [
        ...this.state.klasses,
        klass
      ]
    })
  }

  klassSelectDropdown = () => {
    return (
      <div className="progression-menu-bar">
        <ul>
          {this.state.klasses.map((klass, index) => (
            <li key={index} onClick={this.handleKlassClick} className={this.state.selectedKlassId == klass.id ? 'selected' : ''}>
              {<NavLink to={`/classes/${klass.id}`}>{klass.name}</NavLink>}
            </li>
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
        <Route exact path={`${this.props.match.url}/new`} render={() => <NewKlassForm {...this.props} addKlass={this.addKlass} />} />
        <Route path={`${this.props.match.url}/:id`} render={(routerProps) => <ShowKlassContainer {...routerProps} updateKlassId={this.updateKlassId} klasses={this.state.klasses} />} key={Math.random()} />
      </div>
    )
  }

}

export default KlassesContainer
