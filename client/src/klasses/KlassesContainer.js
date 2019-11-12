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

  removeStudentFromKlass = (student) => {
    fetch(`/klasses/${student.klass_id}/students/${student.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        const newKlasses = [...this.state.klasses]
        const klassIndex = newKlasses.findIndex(klass => klass.id === json.klass_id)
        const studentIndex = newKlasses[klassIndex].students.findIndex(st => st.id === json.id)
        newKlasses[klassIndex].students.splice(studentIndex, 1)

        this.setState({
          ...this.state,
          klasses: [
            ...newKlasses,
          ]
        })
      })
  }

  klassSelectDropdown = () => {
    return (
      <div className="progression-menu-bar">
        <ul>
          {this.state.klasses.map((klass, index) => (
            <li key={index}>
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
          <Route exact path={`${this.props.match.url}/:id`} render={(routerProps) => <ShowKlassContainer {...routerProps} addStudentToKlass={this.addStudentToKlass} removeStudentFromKlass={this.removeStudentFromKlass} removeKlass={this.removeKlass} klasses={this.state.klasses} />} key={Math.random()} />
        </Switch>
      </div>
    )
  }
}

export default KlassesContainer
