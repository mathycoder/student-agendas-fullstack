import React, { Component } from 'react'
import './teacher.css'
import { fetchKlasses } from '../../actions/klassActions'
import { connect } from 'react-redux'

class TeacherProfile extends Component {
  state = {
    name: ''
  }

  componentDidMount(){
    const { fetchKlasses, currentUser } = this.props
    fetchKlasses()
    this.setState({
      ...this.state,
      name: currentUser.name
    })
  }

  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    
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
        <div className="home-page-wrapper profile">
          <div className="klass-index-container">
            <div className="klass-index-title">
              <div>Your Profile</div>
              <div>{this.displayColors()}</div>
            </div>
            <div className="form-input-fields">
              <div class="profile-pic-form">
                <img src="/silhouette.png" />
              </div>
              <div>
                <input
                  required
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  type="text"
                  placeholder="Name" />
              </div>
            </div>
            <div className="klass-index-new-klass-button">
              <input
                type="submit"
                value="Update"/>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses())
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile)
