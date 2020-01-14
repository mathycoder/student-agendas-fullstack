import React, { Component } from 'react'
import { login } from '../../actions/currentUserActions'
import { connect } from 'react-redux'
import '../klasses/Klass.css'
import './sessions.css'

class Login extends Component{
  state = {
    email: '',
    username: '',
    password: '',
    type: "teacher"
  }

  handleRadioChange = event => {
    this.setState({
      ...this.state,
      email: '',
      username: '',
      password: '',
      type: event.target.value
    })
  }

  handleUsernameChange = event => {
    this.setState({
      ...this.state,
      username: event.target.value
    })
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
    event.preventDefault()
    const { login, history } = this.props
    const { email, password, username, type } = this.state
    const params = {
      password: password,
      type: type
    }
    type === "teacher" ? params.email = email : params.username = username
    login(params, history)
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

  emailOrUsername = () => {
    if (this.state.type === "teacher"){
      return (
        <div>
          <input
            required
            value={this.state.email}
            onChange={this.handleEmailChange}
            type="text"
            placeholder="Email" />
        </div>
      )
    } else {
      return (
        <div>
          <input
            required
            value={this.state.username}
            onChange={this.handleUsernameChange}
            type="text"
            placeholder="Username" />
        </div>
      )
    }
  }

  render(){
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="home-page-wrapper login">
          <div className="klass-index-container">
            <div className="klass-index-title">
              <div>Student Agendas</div>
              <div>{this.displayColors()}</div>
            </div>
            <div className="form-input-fields">
              <div className="radio-input">
                <div>
                  <input
                    type="radio"
                    value="teacher"
                    name="type"
                    checked={this.state.type === "teacher" ? 'checked' : ''}
                    onChange={this.handleRadioChange}
                  />Teacher
                </div>
                <div>
                  <input
                    type="radio"
                    value="student"
                    name="type"
                    checked={this.state.type === "student" ? 'checked' : ''}
                    onChange={this.handleRadioChange}
                  />Student
                </div>
              </div>
              {this.emailOrUsername()}
              <div>
                <input
                  required
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password" />
              </div>
            </div>
            <div className="klass-index-new-klass-button">
              <input
                type="submit"
                value="Login"/>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    login: (credentials, history) => dispatch(login(credentials, history))
  }
}

export default connect(null, mapDispatchToProps)(Login)
