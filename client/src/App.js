import React, { Component } from 'react';
import './App.css';
import NewProgressionContainer from './components/progressions/NewProgressionContainer'
import IndexProgressionsContainer from './components/progressions/IndexProgressionsContainer'
import KlassesContainer from './components/klasses/KlassesContainer'
import NavBar from './navbar/NavBar'
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
            <Route exact path="/progressions" component={IndexProgressionsContainer} />
            <Route exact path="/progressions/new" component={NewProgressionContainer} />
            <Route exact path="/progressions/:id" component={NewProgressionContainer} />
            <Route path="/classes" component={KlassesContainer} />
          </main>
        </div>
      </Router>
    )
  }

}

export default App;
