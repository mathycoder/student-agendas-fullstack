import React, { Component } from 'react';
import './App.css';
import ProgressionsContainer from './components/progressions/ProgressionsContainer'
import KlassesContainer from './components/klasses/KlassesContainer'
import { fetchKlasses } from './actions/klassActions'
import { fetchProgressions } from './actions/progressionActions'
import { fetchVideos } from './actions/videoActions'
import NavBar from './components/navbar/NavBar'
import Home from './Home'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class App extends Component {
  componentDidMount(){
    this.props.fetchKlasses()
    this.props.fetchProgressions()
    this.props.fetchVideos()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavBar klasses={this.props.klasses} progressions={this.props.progressions}/>
          </header>
          <main>
            <Route exact path="/" component={Home} />
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
    fetchVideos: () => dispatch(fetchVideos())
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    progressions: state.progressions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
