import React, { Component } from 'react';
import FlashMessage from './components/flash/FlashMessage'
import ProgressionsContainer from './components/progressions/ProgressionsContainer'
import KlassesContainer from './components/klasses/KlassesContainer'
import Login from './components/sessions/Login'
import Logout from './components/sessions/Logout'
import Signup from './components/sessions/Signup'
import { getCurrentUser } from './actions/currentUserActions'
import NavBar from './components/navbar/NavBar'
import { connect } from 'react-redux'
import { Route } from "react-router-dom";


class IndexContainer extends Component {
  state = {
    initialFetch: false
  }

  componentDidMount(){
    const {history, getCurrentUser} = this.props
    getCurrentUser(history)
  }

  render() {
    return (
        <>
          <header className="App-header">
            <NavBar />
          </header>
          <main>
            <FlashMessage />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/logout" component={Logout} />
            <Route path="/progressions" component={ProgressionsContainer} />
            <Route path="/classes" component={KlassesContainer} />
          </main>
        </>
    )
  }

}

function mapDispatchToProps(dispatch){
  return {
    getCurrentUser: (history) => dispatch(getCurrentUser(history))
  }
}


export default connect(null, mapDispatchToProps)(IndexContainer)
