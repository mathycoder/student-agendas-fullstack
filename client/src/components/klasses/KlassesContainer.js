import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'
import KlassesIndex from './KlassesIndex'
import '../progressions/Progression.css'
import './Klass.css'

class KlassesContainer extends Component {

  render() {
    const { match } = this.props
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} render={() => <KlassesIndex {...this.props} />} />
          <Route exact path={`${match.url}/:id`} render={(routerProps) => <ShowKlassContainer {...routerProps} handleKlassClick={this.handleKlassClick} />} key={Math.random()} />
        </Switch>
      </div>
    )
  }
}

export default KlassesContainer
