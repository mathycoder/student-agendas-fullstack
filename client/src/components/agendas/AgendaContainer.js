import React, { Component } from 'react'
import { fetchStudentData } from '../../actions/studentActions'
import { updateStudentProgression } from '../../actions/studentProgressionActions'
import MyAgenda from './MyAgenda'
import MyProgression from './MyProgression'
import { connect } from 'react-redux'
import './myagenda.css'

class AgendaContainer extends Component {
  state = {
    initialLoad: false,
    selectedProgressionId: null,
    itemIndex: 0
  }

  componentDidMount(){
    const { currentUser, fetchStudentData } = this.props
    if(currentUser.type === "student"){
      fetchStudentData(currentUser)
    }
  }

  componentDidUpdate(){
    const { currentUser, progressions, studentProgressions } = this.props
    const { initialLoad } = this.state
    if (!initialLoad && progressions.allIds.length > 0 && studentProgressions.allIds.length > 0){
      const progs = this.getStudentProgressions(currentUser)
      const firstIncomplete = progs.find(prog => !prog.submitted)
      this.setState({
        ...this.state,
        initialLoad: true,
        selectedProgressionId: firstIncomplete ? `progression${firstIncomplete.id}` : null
      })
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
    const myProgressions = myOrderedStudentProgressions.map(sp => {
      const prog = progressions.byId[sp.progressionId]
      prog.submitted = sp.submitted
      prog.createdAt = this.formatDate(sp.createdAt)
      prog.updatedAt = this.formatDate(sp.updatedAt)
      prog.question1Answer = sp.question1Answer
      return prog
    })
    return myProgressions
  }

  formatDate = (rawDate) => {
    const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"]
    const date = new Date(rawDate)
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  handleProgressionClick = (progression, index) => {
    this.setState({
      ...this.state,
      selectedProgressionId: `progression${progression.id}`,
      itemIndex: index
    })
  }

  handleBackClick = () => {
    const { itemIndex } = this.state
    this.setState({
      ...this.state,
      itemIndex: itemIndex - 1
    })
  }

  handleNextClick = () => {
    const { itemIndex } = this.state
    this.setState({
      ...this.state,
      itemIndex: itemIndex + 1
    })
  }

  handleProgressionSubmit = (progression) => {
    const { updateStudentProgression, currentUser } = this.props
    updateStudentProgression(currentUser, progression, "submitted")
    this.setState({
      ...this.state,
      itemIndex: 0,
      selectedProgressionId: null,
    })
  }

  render(){
    const { currentUser, progressions } = this.props
    const { selectedProgressionId, itemIndex } = this.state
    return (
      <div className="myagenda-wrapper">
        <MyAgenda
          itemIndex={itemIndex}
          selectedProgressionId={selectedProgressionId}
          handleProgressionClick={this.handleProgressionClick}
          progressions={this.getStudentProgressions(currentUser)}/>
        <MyProgression
          itemIndex={itemIndex}
          handleProgressionSubmit={this.handleProgressionSubmit}
          handleBackClick={this.handleBackClick}
          handleNextClick={this.handleNextClick}
          progression={progressions.byId[selectedProgressionId]} />
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
    fetchStudentData: (student) => dispatch(fetchStudentData(student)),
    updateStudentProgression: (student, progression, attribute) => dispatch(updateStudentProgression(student, progression, attribute))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaContainer)
