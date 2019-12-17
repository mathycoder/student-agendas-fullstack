import React, { Component } from 'react'
import { fetchStudentData } from '../../actions/studentActions'
import MyAgenda from './MyAgenda'
import MyProgression from './MyProgression'
import { connect } from 'react-redux'
import './myagenda.css'
import { getStudentProgressions } from '../progressions/helpers/getStudentProgressions'
import { updateStudentProgressionStatus } from '../../actions/studentProgressionActions'
import StudentShowSummary from '../students/show/StudentShowSummary'


class AgendaContainer extends Component {
  state = {
    initialLoad: false,
    selectedProgressionId: null,
    itemIndex: 0,
    summaryPage: false
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
      const progs = getStudentProgressions(currentUser, studentProgressions, progressions)
      const firstIncomplete = progs.find(prog => !prog.submitted)
      this.setState({
        ...this.state,
        initialLoad: true,
        selectedProgressionId: firstIncomplete ? `progression${firstIncomplete.id}` : null
      })
    }
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
    const { updateStudentProgressionStatus, currentUser } = this.props
    updateStudentProgressionStatus(currentUser, progression, {submitted: true})
    this.setState({
      ...this.state,
      itemIndex: 0,
      selectedProgressionId: null,
    })
  }

  handleCurrentAgendaClick = (e) => {
    this.setState({
      ...this.state,
      summaryPage: false
    })
  }

  handleAllAssignmentsClick = (e) => {
    this.setState({
      ...this.state,
      summaryPage: true
    })
  }

  renderStudentSummary = () => {
    const { reflections, currentUser, studentProgressions, progressions } = this.props
    return <StudentShowSummary
      currentUser={{name: "Teacher"}}
      student={currentUser}
      reflections={reflections}
      progressions={getStudentProgressions(currentUser, studentProgressions, progressions)}
    />
  }

  renderMyAgenda = () => {
    const { currentUser, studentProgressions, progressions } = this.props
    const { selectedProgressionId, itemIndex, summaryPage } = this.state
    return (
      <div className="myagenda-wrapper">
        <MyAgenda
          itemIndex={itemIndex}
          selectedProgressionId={selectedProgressionId}
          handleProgressionClick={this.handleProgressionClick}
          progressions={getStudentProgressions(currentUser, studentProgressions, progressions)}/>
        <MyProgression
          key={Math.random()}
          itemIndex={itemIndex}
          handleProgressionSubmit={this.handleProgressionSubmit}
          handleBackClick={this.handleBackClick}
          handleNextClick={this.handleNextClick}
          progression={getStudentProgressions(currentUser, studentProgressions, progressions).find(prog => `progression${prog.id}` === selectedProgressionId)} />
      </div>
    )
  }

  render(){
    const { summaryPage } = this.state
    return (
      <div>
        <div className="myagenda-navbar">
          <button onClick={this.handleCurrentAgendaClick}>Current Agenda</button>
          <button onClick={this.handleAllAssignmentsClick}>All Assignments</button>
        </div>
        { !summaryPage ? this.renderMyAgenda() : this.renderStudentSummary()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    studentProgressions: state.studentProgressions,
    progressions: state.progressions,
    reflections: state.reflections
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStudentData: (student) => dispatch(fetchStudentData(student)),
    updateStudentProgressionStatus: (student, progression, status) => dispatch(updateStudentProgressionStatus(student, progression, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaContainer)
