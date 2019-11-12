import React, { Component } from 'react'
import { Route, NavLink, Switch } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'
import NewKlassForm from './NewKlassForm'
import { connect } from 'react-redux'
import { fetchKlasses } from '../actions/fetchKlasses'
import { addKlass } from '../actions/klassActions'

class KlassesContainer extends Component {
  componentDidMount(){
    this.props.fetchKlasses()
  }

  klassSelectDropdown = () => {
    return (
      <div className="progression-menu-bar">
        <ul>
          {this.props.klasses.allIds.map((klassId, index) => {
            const klass = this.props.klasses.byId[klassId]
            return (
              <li key={index}>
                {<NavLink to={`/classes/${klass.id}`}>{klass.name}</NavLink>}
              </li>
            )
          })}
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
          <Route exact path={`${this.props.match.url}/:id`} render={(routerProps) => <ShowKlassContainer {...routerProps} />} key={Math.random()} />
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses()),
    addKlass: (klass) => dispatch(addKlass(klass))
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses}
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesContainer)
