import React, { Component } from 'react';
import './App.css';
import ProgressionsContainer from './components/progressions/ProgressionsContainer'
import KlassesContainer from './components/klasses/KlassesContainer'
import NavBar from './components/navbar/NavBar'
import Home from './Home'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavBar />
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

export default App;
