import React, { Component } from 'react'
import { updateProfilePic } from '../../actions/teacherActions.js'
import { connect } from 'react-redux'

class ProfilePicForm extends Component {
  constructor(props){
    super(props)
    this.fileUploadRef = React.createRef()
  }

  handleClick = e => {
    e.preventDefault()
    const { updateProfilePic, currentUser } = this.props
    const file = this.fileUploadRef.current.files[0]
    updateProfilePic(file, currentUser.id)
  }

  displayProfilePic = () => {
    const { currentUser } = this.props
    if (currentUser.image_url){
      return <img src={`/${currentUser.image_url}`} alt="user profile icon" />
    } else {
      return <img src="/silhouette.png" alt="silhouette icon"/>
    }
  }

  render(){
    return (
      <form onSubmit={this.handleClick}>
        <div className="profile-pic-form">
          {this.displayProfilePic()}
          <div className="file-submit">
            <input
              required
              type="file"
              ref={this.fileUploadRef}
            />
            <input type="submit" value="Upload" />
          </div>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateProfilePic: (file, teacherId) => dispatch(updateProfilePic(file, teacherId))
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicForm)
