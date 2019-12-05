import React, { Component } from 'react';
import ProgressionsContainer from './components/progressions/ProgressionsContainer'
import KlassesContainer from './components/klasses/KlassesContainer'
import Login from './components/sessions/Login'
import Logout from './components/sessions/Logout'
import { getCurrentUser } from './actions/currentUserActions'
import { fetchKlasses } from './actions/klassActions'
import { fetchProgressions } from './actions/progressionActions'
import { fetchVideos } from './actions/videoActions'
import { fetchReflections } from './actions/reflectionActions'
import NavBar from './components/navbar/NavBar'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class App extends Component {
  componentDidMount(){
    this.props.getCurrentUser()
    this.props.fetchKlasses()
    this.props.fetchProgressions()
    this.props.fetchVideos()
    this.props.fetchReflections()
  }

  render() {
    const { klasses, progressions, currentUser } = this.props
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavBar klasses={klasses} progressions={progressions} currentUser={currentUser}/>
          </header>
          <main>
            <Route exact path="/" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route path="/progressions" component={ProgressionsContainer} />
            <Route path="/classes" component={KlassesContainer} />
          </main>
        </div>
      </Router>
    )
  }

}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses()),
    fetchProgressions: () => dispatch(fetchProgressions()),
    fetchVideos: () => dispatch(fetchVideos()),
    fetchReflections: () => dispatch(fetchReflections()),
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    progressions: state.progressions,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
