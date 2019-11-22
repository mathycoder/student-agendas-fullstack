import React, { Component } from 'react'
import { Route, NavLink, Switch } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'
import NewKlassForm from './NewKlassForm'
import { connect } from 'react-redux'
import { addKlass } from '../../actions/klassActions'
import '../progressions/Progression.css'
import './Klass.css'

class KlassesContainer extends Component {
  state = {
      klassId: ""
  }

  render() {
    const { match, addKlass } = this.props
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}/new`} render={() => <NewKlassForm {...this.props} addKlass={addKlass} />} />
          <Route exact path={`${match.url}/:id`} render={(routerProps) => <ShowKlassContainer {...routerProps} handleKlassClick={this.handleKlassClick} />} key={Math.random()} />
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addKlass: (klass) => dispatch(addKlass(klass))
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses}
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesContainer)
