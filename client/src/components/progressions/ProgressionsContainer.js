import React, { Component } from 'react'
import NewProgressionContainer from './NewProgressionContainer'
import StudentProgressionsContainer from './StudentProgressionsContainer'
import { Route, Switch } from "react-router-dom";

class ProgressionsContainer extends Component {

  render(){
    return (
      <Switch>
        <Route exact path="/progressions" render={(routerProps) => <StudentProgressionsContainer indexPage={true} {...routerProps}/>} />
        <Route exact path="/progressions/new" render={(props) => <NewProgressionContainer {...props} key={Math.random()}/>} />
        <Route exact path="/progressions/:id" component={NewProgressionContainer} />
      </Switch>
    )
  }
}

export default ProgressionsContainer
