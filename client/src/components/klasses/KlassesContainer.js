import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
// import ShowKlassContainer from './ShowKlassContainer'
import KlassesIndex from './KlassesIndex'
import ShowKlassRouter from './ShowKlassRouter'
import '../progressions/Progression.css'
import './Klass.css'
import { connect } from 'react-redux'
import { fetchKlasses } from '../../actions/klassActions'
import { fetchProgressions } from '../../actions/progressionActions'
import { addFlashMessage } from '../../actions/flashActions'

class KlassesContainer extends Component {
  componentDidMount(){
    const {fetchKlasses, fetchProgressions } = this.props
    fetchKlasses()
    fetchProgressions()
  }

  renderShowRoute = () => {
    const { match, klasses, addFlashMessage } = this.props
    return <Route path={`${match.url}/:id`} key={Math.random()} render={(routerProps) => {
      const klassId = `klass${routerProps.match.params.id}`
      const {allIds} = klasses
      if (allIds.includes(klassId)) {
        return <ShowKlassRouter {...routerProps} />
      } else {
        addFlashMessage("You don't have access to that class")
        return <Redirect to="/classes"/>
      }
    }}/>
  }

  render() {
    const { match, klasses } = this.props
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} component={KlassesIndex}/>
          {klasses.allIds.length > 0 ? this.renderShowRoute() : ''}
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses()),
    fetchProgressions: () => dispatch(fetchProgressions()),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesContainer)
