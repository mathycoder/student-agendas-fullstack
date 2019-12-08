import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, path, currentUser}) => (
  <Route path={path} render={(props) => (
      currentUser !== "none" ?
      <Component {...props} />
    : <Redirect to="/login"/>
  )} />
)

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
