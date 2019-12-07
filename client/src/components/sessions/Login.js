import React, { Component } from 'react'
import { login } from '../../actions/currentUserActions'
import { connect } from 'react-redux'
import '../klasses/Klass.css'
import './sessions.css'

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
    const { login, history } = this.props
    event.preventDefault()
    login(this.state, history)
    this.setState({
      ...this.state,
      email: '',
      password: ''
    })
  }

  displayColors = () => {
    return ["red", "orange", "green", "blue", "purple"].map((color, index) => {
      return (
        <div
          key={index}
          className={`select-color ${color}-title`}>
        </div>
      )
    })
  }


  render(){
    return (
      <div className="home-page-wrapper login">
        <div className="klass-index-container">
          <div className="klass-index-title">
            <div>Student Agendas</div>
            <div>{this.displayColors()}</div>
          </div>
          <div className="form-input-fields">
            <div>
              <input
                value={this.state.email}
                onChange={this.handleEmailChange}
                type="text"
                placeholder="Email" />
            </div>
            <div>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                placeholder="Password" />
            </div>
          </div>
          <div className="klass-index-new-klass-button">
            <button onClick={this.handleFormSubmit}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    login: (credentials, history) => dispatch(login(credentials, history))
  }
}

export default connect(null, mapDispatchToProps)(Login)
