import React, { Component } from 'react'
import { logout } from '../../actions/currentUserActions'
import { connect } from 'react-redux'
import '../klasses/Klass.css'
import './sessions.css'

class Logout extends Component{

  handleButtonClick = () => {
    const { logout, history } = this.props
    logout(history)
  }

  render(){
    return (
      <div className="home-page-wrapper">
        {this.handleButtonClick()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    logout: (history) => dispatch(logout(history))
  }
}

export default connect(null, mapDispatchToProps)(Logout)
