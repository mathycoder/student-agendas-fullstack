import React, { Component } from 'react'
import NewProgressionContainer from './NewProgressionContainer'
import IndexProgressionsContainer from './IndexProgressionsContainer'
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchKlasses } from '../../actions/klassActions'
import { fetchProgressions } from '../../actions/progressionActions'

class ProgressionsContainer extends Component {
  componentDidMount(){
    const {fetchKlasses, fetchProgressions } = this.props
    fetchKlasses()
    fetchProgressions()
  }

  render(){
    return (
      <Switch>
        <Route exact path="/progressions" render={(routerProps) => <IndexProgressionsContainer indexPage={true} key={Math.random()} {...routerProps}/>} />
        <Route exact path="/progressions/new" render={(props) => <NewProgressionContainer {...props} key={Math.random()}/>} />
        <Route exact path="/progressions/:id" component={NewProgressionContainer} />
      </Switch>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses()),
    fetchProgressions: () => dispatch(fetchProgressions())
  }
}

export default connect(null, mapDispatchToProps)(ProgressionsContainer)
