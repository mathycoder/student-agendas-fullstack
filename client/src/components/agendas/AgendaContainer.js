import React, { Component } from 'react'
import { fetchStudentData } from '../../actions/studentActions'
import { updateStudentProgression } from '../../actions/studentProgressionActions'
import MyAgenda from './MyAgenda'
import MyProgression from './MyProgression'
import { connect } from 'react-redux'
import './myagenda.css'
import { getStudentProgressions } from '../progressions/helpers/getStudentProgressions'

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
    const { updateStudentProgression, currentUser } = this.props
    updateStudentProgression(currentUser, progression, "submitted")
    this.setState({
      ...this.state,
      itemIndex: 0,
      selectedProgressionId: null,
    })
  }

  render(){
    const { currentUser, studentProgressions, progressions } = this.props
    const { selectedProgressionId, itemIndex } = this.state
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
