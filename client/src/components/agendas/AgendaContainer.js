import React, { Component } from 'react'
import { fetchStudentData } from '../../actions/studentActions'
import { connect } from 'react-redux'

class AgendaContainer extends Component {
  componentDidMount(){
    const { currentUser, fetchStudentData } = this.props
    if(currentUser.type === "student"){
      fetchStudentData(currentUser)
    }
  }

  render(){
    return (
      <div>Agenda Component</div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStudentData: (student) => dispatch(fetchStudentData(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaContainer)
