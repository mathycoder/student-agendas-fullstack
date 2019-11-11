import React, { Component } from 'react'
import { Route, NavLink, Switch } from "react-router-dom";
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

  removeKlass = (klass) => {
    this.setState({
      ...this.state,
      klasses: this.state.klasses.filter(kl => kl.id !== klass.id)
    })
  }

  addStudentToKlass = (student) => {
    const newKlasses = [...this.state.klasses]
    const index = newKlasses.findIndex(klass => klass.id === student.klass_id)
    newKlasses[index].students.push(student)

    this.setState({
      ...this.state,
      klasses: [
        ...newKlasses,
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
        <Switch>
          <Route exact path={`${this.props.match.url}/new`} render={() => <NewKlassForm {...this.props} addKlass={this.addKlass} />} />
          <Route exact path={`${this.props.match.url}/:id`} render={(routerProps) => <ShowKlassContainer {...routerProps} addStudentToKlass={this.addStudentToKlass} updateKlassId={this.updateKlassId} removeKlass={this.removeKlass} klasses={this.state.klasses} />} key={Math.random()} />
        </Switch>
      </div>
    )
  }

}

export default KlassesContainer
