import React, { Component } from 'react'
import IndexProgressionsContainer from './IndexProgressionsContainer'
import NewProgressionContainer from './NewProgressionContainer'
import { Route, Switch } from "react-router-dom";

class ProgressionsContainer extends Component {

  render(){
    return (
      <Switch>
        <Route exact path="/progressions" render={(routerProps) => <IndexProgressionsContainer {...routerProps}/>} />
        <Route exact path="/progressions/new" render={(props) => <NewProgressionContainer {...props} key={Math.random()}/>} />
        <Route exact path="/progressions/:id" component={NewProgressionContainer} />
      </Switch>
    )
  }
}

export default ProgressionsContainer
