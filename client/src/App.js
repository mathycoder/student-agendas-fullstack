import React, { Component } from 'react';
import IndexContainer from './IndexContainer'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={IndexContainer} />
        </div>
      </Router>
    )
  }

}



export default App
