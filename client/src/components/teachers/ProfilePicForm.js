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

  displayProfilePic = () => {
    const { currentUser } = this.props
    if (currentUser.image_url){
      return <img src={`/${currentUser.image_url}`} />
    } else {
      return <img src="/silhouette.png" />
    }
  }

  // return <img src={`/${encodeURI(currentUser.image_url)}`} />

  render(){
    return (
      <div className="profile-pic-form">

        {this.displayProfilePic()}


        <div className="file-submit">
          <input
            type="file"
            ref={this.fileUploadRef}
          />
          <button onClick={this.handleClick}>Upload</button>
        </div>
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
