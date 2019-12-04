import React, { Component } from 'react'
import { login } from '../actions/currentUserActions'
import { connect } from 'react-redux'

class Login extends Component{

  state = {
    email: '',
    password: ''
  }

  handleEmailChange = event => {
    this.setState({
      ...this.state,
      email: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  handleFormSubmit = event => {
    const { login } = this.props
    event.preventDefault()
    login(this.state)
  }


  render(){
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type="text"
            placeholder="Email" />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    login: (credentials) => dispatch(login(credentials))
  }
}

export default connect(null, mapDispatchToProps)(Login)
