import React, { Component } from 'react'
import { Route, NavLink, Switch } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'
import NewKlassForm from './NewKlassForm'
import { connect } from 'react-redux'
import { fetchKlasses } from '../actions/fetchKlasses'
import { addKlass, removeKlass } from '../actions/klassActions'

class KlassesContainer extends Component {
  componentDidMount(){
    this.props.fetchKlasses()
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
          {this.props.klasses.map((klass, index) => (
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
          <Route exact path={`${this.props.match.url}/new`} render={() => <NewKlassForm {...this.props} addKlass={this.props.addKlass} />} />
          <Route exact path={`${this.props.match.url}/:id`} render={(routerProps) => <ShowKlassContainer {...routerProps} removeStudentFromKlass={this.removeStudentFromKlass} removeKlass={this.props.removeKlass} />} key={Math.random()} />
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses()),
    addKlass: (klass) => dispatch(addKlass(klass)),
    removeKlass: (klass) => dispatch(removeKlass(klass))
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses}
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesContainer)
