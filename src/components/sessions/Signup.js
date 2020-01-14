import React, { Component } from 'react'
import { signup } from '../../actions/teacherActions'
import { connect } from 'react-redux'
import '../klasses/Klass.css'
import './sessions.css'

class Signup extends Component{

  state = {
    name: '',
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

  handleNameChange = event => {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleFormSubmit = event => {
    const { signup, history } = this.props
    event.preventDefault()
    signup(this.state, history)
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
      <div className="home-page-wrapper signup">
        <form onSubmit={this.handleFormSubmit}>
          <div className="klass-index-container">
            <div className="klass-index-title">
              <div>Create New Account</div>
              <div>{this.displayColors()}</div>
            </div>
            <div className="form-input-fields">
              <div>
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  type="text"
                  required
                  placeholder="Full Name" />
              </div>
              <div>
                <input
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  type="text"
                  required
                  placeholder="Email" />
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password" />
              </div>
            </div>
            <div className="klass-index-new-klass-button">
              <input type="submit" value="Create Teacher Account"/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    signup: (teacherData, history) => dispatch(signup(teacherData, history))
  }
}

export default connect(null, mapDispatchToProps)(Signup)
