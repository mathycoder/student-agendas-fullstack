import React, { Component } from 'react'
import { login } from '../../actions/currentUserActions'
import { connect } from 'react-redux'
import '../klasses/Klass.css'
import './sessions.css'

class Login extends Component{

  state = {
    email: '',
    password: '',
    type: "teacher"
  }

  handleRadioChange = event => {
    this.setState({
      ...this.state,
      type: event.target.value
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
    const { login, history } = this.props
    event.preventDefault()
    login(this.state, history)
    window.setTimeout(() => (
      this.setState({
        ...this.state,
        email: '',
        password: ''
      })
    ), 400)
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
              <div>
                <input
                  required
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  type="text"
                  placeholder="Email" />
              </div>
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
