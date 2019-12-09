import React, { Component } from 'react'
import { updateProfilePic } from '../../actions/teacherActions.js'
import { connect } from 'react-redux'

class ProfilePicForm extends Component {
  constructor(props){
    super(props)
    this.fileUploadRef = React.createRef()
  }

  handleClick = e => {
    const { updateProfilePic, currentUser } = this.props
    const file = this.fileUploadRef.current.files[0]
    updateProfilePic(file, currentUser.id)

  }

  render(){
    return (
      <div className="profile-pic-form">
        <img src="/silhouette.png" />
        <br/>
        <input
          type="file"
          ref={this.fileUploadRef}
        />
        <button onClick={this.handleClick}>Upload</button>
      </div>
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
