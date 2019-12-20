import React, { Component } from 'react';
import FlashMessage from './components/flash/FlashMessage'
import ProgressionsContainer from './components/progressions/ProgressionsContainer'
import KlassesContainer from './components/klasses/KlassesContainer'
import TeacherProfile from './components/teachers/TeacherProfile'
import AgendaContainer from './components/agendas/AgendaContainer'
import Login from './components/sessions/Login'
import Logout from './components/sessions/Logout'
import Signup from './components/sessions/Signup'
import { getCurrentUser } from './actions/currentUserActions'
import NavBar from './components/navbar/NavBar'
import { connect } from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from './components/routes/PrivateRoute'


class IndexContainer extends Component {
  state = {
    initialFetch: false
  }

  componentDidMount(){
    this.props.getCurrentUser()
  }

  renderRoutes = () => {
    const {currentUser} = this.props
    if (currentUser) {
      return (
        <>
          <Route exact path="/" component={Login} />
          <Route exact path="/login"
            render={(props) => (
              currentUser === "none" ? <Login /> :
              (currentUser.type === "teacher" ?
                <Redirect to="/classes"/> :
                <Redirect to="/myagenda"/>))}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute type="student" path="/myagenda" component={AgendaContainer} />
          <PrivateRoute type="teacher" path="/profile" component={TeacherProfile} />
          <PrivateRoute type="teacher" path="/progressions" component={ProgressionsContainer} />
          <PrivateRoute type="teacher" path="/classes" component={KlassesContainer} />
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
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
