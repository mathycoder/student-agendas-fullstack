import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const PublicRoute = ({ component: Component, path, currentUser, type}) => (
  <Route exact path={path}
    render={(props) => (
      currentUser === "none" ? <Component {...props} /> :
      (currentUser.type === "teacher" ?
        <Redirect to="/classes"/> :
        <Redirect to="/myagenda"/>))}
  />
)

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(PublicRoute)
