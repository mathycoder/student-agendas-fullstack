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
import { Route, Redirect } from "react-router-dom";


class IndexContainer extends Component {
  state = {
    initialFetch: false
  }

  componentDidMount(){
    const {history, getCurrentUser} = this.props
    getCurrentUser(history)
  }

  renderRoutes = () => {
    const {currentUser} = this.props
    if (currentUser) {
      return (
        <>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/progressions" component={ProgressionsContainer} />
          <Route path="/classes" render={(props) => (
              currentUser !== "none" ?
              <KlassesContainer{...props} />
            : <Redirect to="/login"/>
          )} />
        </>
      )
    } else {
      return <></>
    }
  }

  render() {
    return (
        <>
          <header className="App-header">
            <NavBar />
          </header>
          <main>
            <FlashMessage />
            { this.renderRoutes()}
          </main>
        </>
    )
  }

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCurrentUser: (history) => dispatch(getCurrentUser(history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
