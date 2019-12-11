import React, { Component } from 'react'
import { fetchStudentData } from '../../actions/studentActions'
import MyAgenda from './MyAgenda'
import { connect } from 'react-redux'

class AgendaContainer extends Component {
  componentDidMount(){
    const { currentUser, fetchStudentData } = this.props
    if(currentUser.type === "student"){
      fetchStudentData(currentUser)
    }
  }

  getStudentProgressions = (student) => {
    const { studentProgressions, progressions } = this.props
    const myStudentProgressionIds = studentProgressions.allIds.filter(spId => {
      const studentProgression = studentProgressions.byId[spId]
      return studentProgression.studentId === `student${student.id}`
    })
    const myStudentProgressions = myStudentProgressionIds.map(stPrId => {
      return studentProgressions.byId[stPrId]
    })
    const myOrderedStudentProgressions = myStudentProgressions.sort((a,b) => a.agendaIndex - b.agendaIndex)
    const myProgressions = myOrderedStudentProgressions.map(sp => progressions.byId[sp.progressionId])

    return myProgressions
  }

  render(){
    const { currentUser } = this.props
    return (
      <div className="myagenda-wrapper">
        <MyAgenda
          progressions={this.getStudentProgressions(currentUser)}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    studentProgressions: state.studentProgressions,
    progressions: state.progressions
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStudentData: (student) => dispatch(fetchStudentData(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaContainer)
