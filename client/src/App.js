import React, { Component } from 'react';
import './App.css';
import NewProgressionContainer from './progressions/NewProgressionContainer'
import NavBar from './navbar/NavBar'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
            <Route exact path="/progressions/new" component={NewProgressionContainer} />
          </main>
        </div>
      </Router>
    )
  }

}

export default App;
