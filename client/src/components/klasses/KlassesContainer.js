import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import ShowKlassContainer from './ShowKlassContainer'
import KlassesIndex from './KlassesIndex'
import '../progressions/Progression.css'
import './Klass.css'
import { connect } from 'react-redux'
import { fetchKlasses } from '../../actions/klassActions'
import { fetchProgressions } from '../../actions/progressionActions'
import { fetchVideos } from '../../actions/videoActions'
import { fetchReflections } from '../../actions/reflectionActions'

class KlassesContainer extends Component {
  componentDidMount(){
    const {fetchKlasses, fetchProgressions, fetchVideos, fetchReflections} = this.props
    fetchKlasses()
    fetchProgressions()
    fetchVideos()
    fetchReflections()
  }

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

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses()),
    fetchProgressions: () => dispatch(fetchProgressions()),
    fetchVideos: () => dispatch(fetchVideos()),
    fetchReflections: () => dispatch(fetchReflections())
  }
}

export default connect(null, mapDispatchToProps)(KlassesContainer)
